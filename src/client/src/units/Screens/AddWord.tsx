import {Button, Card, CardBody} from "@nextui-org/react";
import {ChangeEvent, FormEvent, useState} from "react";
import {useAppSelector} from "../../store/hooks.ts";
import {getSelectorChoices} from "../utils/utils.ts";
import WordInput from "./WordInput.tsx";

const AddWord = () => {
  const parts_of_speech = useAppSelector((state) => state.base.properties.parts_of_speech);
  const languages = useAppSelector((state) => state.base.properties.languages);
  const partsOfSpeech = getSelectorChoices(parts_of_speech);

  const WordsForm = () => {
    const initialFormData: Record<string, string>[] = []
    languages.map(language => (
      initialFormData.push({
        languageCode: language.code,
        word: '',
        level: '',
        partOfSpeech: '',
        article: '',
        plural: '',
        sentence: '',
        note: '',
      })
    ));
    return initialFormData;
  }

  const [formData, setFormData] = useState(WordsForm())

  const handleInputChange = (index: number, event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const {name, value} = event.target;
    const updatedForms = [...formData];
    updatedForms[index][name] = value;
    setFormData(updatedForms);
    console.log(formData);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(formData)
  }

  return (
    <>
      <div className="flex justify-center mx-auto max-w-screen-xl gap-2 pt-2 ps-2 pe-2">
        <Card className="w-full shadow-sm shadow-purple-500 p-4">
          <CardBody>
            <p className="flex justify-center">Adding the Word: Ansehen</p>
          </CardBody>
        </Card>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center mx-auto max-w-screen-xl gap-2 pt-2 ps-2 pe-2">
          <div className="grid md:grid-cols-3 gap-2">
            {formData.map((formData, index) => (
              <WordInput key={formData.languageCode} formData={formData} index={index} language={languages[index]}
                         partsOfSpeech={partsOfSpeech} onChange={handleInputChange}/>
            ))}
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
