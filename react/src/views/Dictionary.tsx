import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Button, Input, Message, Title } from "../styles/forms";

interface DictionaryEntry {
    word: string;
    phonetic?: string;
    phonetics: PhoneticInterface[];
    meanings: MeaningInterface[];
    license?: License;
    sourceUrls: string[];
}

interface PhoneticInterface {
    text?: string;
    audio?: string;
    sourceUrl?: string;
    license?: License;
}

interface MeaningInterface {
    partOfSpeech: string;
    definitions: Definition[];
    synonyms: string[];
    antonyms: string[];
}

interface Definition {
    definition: string;
    example?: string;
    synonyms: string[];
    antonyms: string[];
}

interface License {
    name: string;
    url: string;
}


const Dictionary = () => {
    const [word, setWord] = useState("");
    const [result, setResult] = useState<DictionaryEntry | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSearch = async () => {
        if (!word.trim()) return;
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            if (!res.ok) throw new Error("Word not found");
            const data = await res.json();
            setResult(data[0]);
            setWord('');
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Please, try later");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <StyledMain>
            {
                !result && !loading &&
                <SearchWrapper>
                    <Title style={{ fontSize: '60px' }}>Dictionary</Title>
                    <Input
                        type="text"
                        value={word}
                        onChange={(e) => setWord(e.target.value)}
                        placeholder="Enter a word..."
                        id="word"
                        style={{ borderRadius: '10px' }}
                    />
                    <Button style={{
                        minWidth: 'fit-content',
                        backgroundColor: '#9c9be3',
                    }} onClick={handleSearch}>Search</Button>
                </SearchWrapper>
            }

            {loading && <Loader />}
            {error && <Message style={{
                alignSelf: 'center',
                fontWeight: 'bold',
                fontSize: '20px'
            }}>{error}</Message>}

            {result &&
                <Result>
                    <SearchWrapper style={{ flexDirection: 'row', width: '100%', transform: 'unset' }}>
                        <Input
                            type="text"
                            value={word}
                            onChange={(e) => setWord(e.target.value)}
                            placeholder="Enter a word..."
                            id="word"
                            style={{ flexGrow: 1, borderRadius: '10px' }}
                        />
                        <Button style={{
                            minWidth: 'fit-content',
                            backgroundColor: '#9c9be3',
                        }} onClick={handleSearch}>Search</Button>
                    </SearchWrapper>
                    <Phonetic>
                        <Word style={{ textTransform: 'capitalize' }}>{result.word}</Word>
                        {
                            result.phonetics.length > 0 &&
                            <>
                                <Transcription>{result.phonetic || result.phonetics.find(item => item.audio != '' && item.text)?.text || result.phonetics.find(item => item.audio != '')?.text}</Transcription>
                                <audio controls src={result.phonetics.find(item => item.audio != '' && item.text)?.audio || result.phonetics.find(item => item.audio != '')?.audio}></audio>
                            </>
                        }
                    </Phonetic>
                    <h2>Definitions:</h2>
                    {result.meanings.map((meaning, index) => (
                        <div key={index}>
                            <Columns>
                                <PartOfSpeech>{meaning.partOfSpeech}</PartOfSpeech>
                                <MainDefinitions>
                                    {meaning.definitions.map((item, i) => (
                                        <Definition key={i}>
                                            <p><span>&bull;</span> {item.definition}</p>
                                            {
                                                item.example && (
                                                    <Example>"{item.example}"</Example>
                                                )
                                            }
                                        </Definition>
                                    ))}
                                </MainDefinitions>
                                {
                                    meaning.synonyms.length > 0 &&
                                    <div>
                                        <h4 style={{ marginTop: '20px' }}>Synonyms</h4>
                                        <Definitions style={{ marginTop: '10px' }}>
                                            {
                                                meaning.synonyms.length > 0 && meaning.synonyms
                                                    .filter((item, index) => meaning.synonyms
                                                        .indexOf(item) === index).map((item, i) =>
                                                            <Definition key={i} style={{ backgroundColor: '#d0ffe4' }}>
                                                                <p>{item}</p>
                                                            </Definition>)
                                            }
                                        </Definitions>
                                    </div>
                                }
                                {
                                    meaning.antonyms.length > 0 &&
                                    <div>
                                        <h4 style={{ marginTop: '20px' }}>Antonyms</h4>
                                        <Definitions style={{ marginTop: '10px' }}>
                                            {
                                                meaning.antonyms.length > 0 && meaning.antonyms
                                                    .filter((item, index) => meaning.antonyms.indexOf(item) === index)
                                                    .map((item, i) =>
                                                        <Definition key={i} style={{ backgroundColor: '#ffd7d7' }}>
                                                            <p>{item}</p>
                                                        </Definition>)
                                            }
                                        </Definitions>
                                    </div>
                                }
                            </Columns>
                        </div>
                    ))}
                </Result>
            }
        </StyledMain>
    );
};

export default Dictionary;

const Transcription = styled.p`
    font-size: 24px;
    color: gray;
    margin-left: auto;

    @media (max-width: 1024px) {
        margin-left: unset;
    }
`

const Columns = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    column-gap: 40px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`

const Definition = styled.div`
    max-width: 500px;
    background-color: #f3f3f3;
    border-radius: 12px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Definitions = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 10px;
`

const MainDefinitions = styled(Definitions)`
    grid-column: 1 / 3;

    @media (max-width: 768px) {
        grid-column: unset;
    }
`

const Result = styled.div`
    align-self: center;
    width: 85%;
    display: flex;
    flex-direction: column;
    gap: 30px;

    @media (max-width: 768px) {
        width: 100%;
    }
`

const Word = styled.h1`
    font-weight: 600;
    font-size: 60px;
`

const AnimationLoader = keyframes`
    0%     {background-position: calc(0*100%/3) 50% ,calc(1*100%/3) 50% ,calc(2*100%/3) 50% ,calc(3*100%/3) 50% }
    16.67% {background-position: calc(0*100%/3) 0   ,calc(1*100%/3) 50% ,calc(2*100%/3) 50% ,calc(3*100%/3) 50% }
    33.33% {background-position: calc(0*100%/3) 100%,calc(1*100%/3) 0   ,calc(2*100%/3) 50% ,calc(3*100%/3) 50% }
    50%    {background-position: calc(0*100%/3) 50% ,calc(1*100%/3) 100%,calc(2*100%/3) 0   ,calc(3*100%/3) 50% }
    66.67% {background-position: calc(0*100%/3) 50% ,calc(1*100%/3) 50% ,calc(2*100%/3) 100%,calc(3*100%/3) 0   }
    83.33% {background-position: calc(0*100%/3) 50% ,calc(1*100%/3) 50% ,calc(2*100%/3) 50% ,calc(3*100%/3) 100%}
    100%   {background-position: calc(0*100%/3) 50% ,calc(1*100%/3) 50% ,calc(2*100%/3) 50% ,calc(3*100%/3) 50% }
`

const Loader = styled.div`
    margin: auto;
    width: fit-content;
    height: 30px;
    aspect-ratio: 2.5;
    --_g: no-repeat radial-gradient(farthest-side,#2d2d2d 90%,#0000);
    background:var(--_g), var(--_g), var(--_g), var(--_g);
    background-size: 20% 50%;
    animation: ${AnimationLoader} 1s infinite linear; 
`

const StyledMain = styled.main`
    min-height: calc(100dvh - 223.25px);
    padding: 28px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    gap: 20px;

    @media (577px <= width <= 768px) {
        padding: 24px;
        gap: 24px;
    }

    @media (425px <= width <= 576px) {
        padding: 20px;
        gap: 20px;
    }

    @media (425px >= width) {
        padding: 12px;
        gap: 12px;
    }
`;

const SearchWrapper = styled.div`
    transform: translateY(-25%);
    align-self: center;
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 18px;

    @media (max-width: 768px) {
        width: 100%;
        align-self: unset;
    }
`;

const Phonetic = styled.div`
    display: flex;
    align-items: center;
    gap: 28px;

    @media (max-width: 1024px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const PartOfSpeech = styled.h3`
    margin-bottom: 8px;
    text-transform: capitalize;
    color: #6c5ce7;
`;

const Example = styled.p`
    margin-top: 6px;
    width: fit-content;
    background-color: #9c9be35c;
    border-radius: 6px;
    padding: 6px 8px;
`;
