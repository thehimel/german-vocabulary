import WordInput from "./WordInput.tsx";

const AddWord = () => {
  const articles = [
    {key: 'der', label: 'der'},
    {key: 'die', label: 'die'},
    {key: 'das', label: 'das'},
  ]
  const partsOfSpeech = [
    {key: 'noun', label: 'Noun'},
    {key: 'pronoun', label: 'Pronoun'},
    {key: 'verb', label: 'Verb'},
  ]
  return (
    <div className="flex justify-center mx-auto max-w-screen-xl gap-2 pt-2 ps-2 pe-2">
      <div className="grid md:grid-cols-3 gap-2">
        <WordInput partsOfSpeech={partsOfSpeech} articles={articles}/>
        <WordInput partsOfSpeech={partsOfSpeech} articles={articles}/>
        <WordInput partsOfSpeech={partsOfSpeech} articles={articles}/>
      </div>
    </div>
  );
}

export default AddWord;
