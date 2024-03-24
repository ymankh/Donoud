import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  thematicBreakPlugin,
} from "@mdxeditor/editor";

const NoteEdit = () => {
  return (
    <>
      <div
        className=" container bg-dark"
        style={{ width: "200px", height: "80vh" }}
      >
        <MDXEditor
          plugins={[
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            markdownShortcutPlugin(),
          ]}
          markdown={`  * Item 1
      * Item 2
      * Item 3
      * * nested item
    
      1. Item 1
      2. Item 2`}
        />
      </div>
    </>
  );
};

export default NoteEdit;
