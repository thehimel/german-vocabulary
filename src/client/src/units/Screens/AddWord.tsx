import {Button, Card, Chip} from "@nextui-org/react";
import {ChangeEvent, FormEvent, useState} from "react";
import {useParams} from "react-router-dom";
import {Language, levelChoices} from "../../store/base/baseSlice.ts";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {CreatePreview, createPreview} from "../../store/previews/previewsActions.ts";
import {AppDispatch} from "../../store/store.ts";
import Selector from "../Selectors/Selector.tsx";
import {getSelectorChoices} from "../utils/utils.ts";
import WordInput from "./WordInput.tsx";

export interface Preview {
  id: number;
  title: string;
  level: string;
  language: Language;
  part_of_speech: { title: string };
  article: { title: string };
}

const AddWord = () => {
  const { index } = useParams();

  const dispatch: AppDispatch = useAppDispatch();
  const previews = useAppSelector((state) => state.previews.previews);
  const preview: Preview = previews[index ? parseInt(index, 10) : 0];
  const parts_of_speech = useAppSelector((state) => state.base.properties.parts_of_speech);
  const languages = useAppSelector((state) => state.base.properties.languages);
  const partsOfSpeech = getSelectorChoices(parts_of_speech);
  const initialPartOfSpeech = preview.part_of_speech ? preview.part_of_speech.title.toLowerCase() : '';
  const initialLevel = preview.level ? preview.level : '';
  const [partOfSpeech, setPartOfSpeech] = useState(initialPartOfSpeech);
  const isNoun = partOfSpeech.toLowerCase() === 'noun';
  const handlePartOfSpeechChange = (e: ChangeEvent<HTMLSelectElement>) => setPartOfSpeech(e.target.value);
  const partsOfSpeechComponent = partsOfSpeech && partsOfSpeech.length > 0 ? (
    <Selector isRequired isDisabled={!!initialPartOfSpeech} name="partOfSpeech" label="Part of Speech" value={partOfSpeech} defaultKey={partOfSpeech} choices={partsOfSpeech} onChange={handlePartOfSpeechChange} />
  ) : null;

  const [level, setLevel] = useState(initialLevel);
  const handleLevelChange = (e: ChangeEvent<HTMLSelectElement>) => setLevel(e.target.value);

  const WordsForm = () => {
    const initialFormData: Record<string, string>[] = []
    languages.map(language => {
      let title = ''
      let article = ''
      if (language.code === preview.language.code) {
        title = preview.title;
        article = preview.article ? preview.article.title : article;
      }

      initialFormData.push({
        languageCode: language.code,
        title: title,
        article: article,
        plural: '',
        sentence: '',
        note: '',
      });
    });
    return initialFormData;
  }
  const [formData, setFormData] = useState(WordsForm())

  const handleInputChange = (index: number, event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const {name, value} = event.target;
    if (name === 'partOfSpeech') {setPartOfSpeech(value);}

    const updatedForms = [...formData];
    updatedForms[index][name] = value;
    setFormData(updatedForms);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const words = formData.map(form => ({
      ...form,
      partOfSpeech: partOfSpeech,
      level: level,
    }));

    const data: CreatePreview = {
      id: preview.id,
      partOfSpeech: partOfSpeech,
      words: words
    }
    dispatch(createPreview(data))
  }

  return (
    <>
      <div className="flex justify-center mx-auto max-w-screen-xl gap-2 pt-2 ps-2 pe-2">
        <Card className="w-full p-4">
          <div className="flex justify-center">
            <Chip color="warning" variant="shadow" className="animate-appearance-in">
              {preview.title}
            </Chip>
          </div>
        </Card>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center max-w-screen-xl mx-auto gap-2 p-2 pb-0">
          <Card className="w-full">
            <div className="flex justify-center gap-2 p-2">
              {partsOfSpeechComponent}
              <Selector isRequired isDisabled={!!initialLevel} name="level" label="Level" value={level} defaultKey={level} choices={levelChoices} onChange={handleLevelChange}/>
            </div>
          </Card>
        </div>

        <div className="flex justify-center mx-auto max-w-screen-xl gap-2 pt-2 ps-2 pe-2">
          <div className="w-full">
            <div className="grid md:grid-cols-3 gap-2">
              {formData.map((formData, index) => (
                <WordInput key={formData.languageCode} formData={formData} index={index} language={languages[index]}
                           isNoun={isNoun} onChange={handleInputChange} preview={preview}/>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center max-w-screen-xl mx-auto p-2 pb-0">
          <Button className="w-full shadow-sm shadow-purple-500 dark:bg-zinc-800" type="submit">Submit</Button>
        </div>
      </form>
    </>
  );
}

export default AddWord;
