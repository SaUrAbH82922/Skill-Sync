import { RichTextEditor } from '@mantine/rte';

const RichTextEditorComponent = ({ input, setInput }) => {
  const handleChange = (content) => {
    setInput({ ...input, description: content });
  };

  return <RichTextEditor value={input.description} onChange={handleChange} />;
};

export default RichTextEditorComponent;
