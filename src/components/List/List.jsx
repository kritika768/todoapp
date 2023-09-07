import Button from "../Button/Button";
import Input from "../Input/Input";
import styles from "./List.module.css";

const List = ({ list, isDoneHandler, deleteHandler, swapItemsHandler,isEditingHandler,cancelHandler,inputChangeHandler, saveHandler }) => {
  // ['a', 'b', 'c'] ==> [<li key="">a</li>, <li key="">b</li>, <li key="">c</li>] (array of jsx)

  const listItem = list.map((task, index) => (
    <li
      key={index}
      className={
        task.isDone
          ? `${styles.doneItem} ${styles.itemContainer}`
          : styles.itemContainer
      }
    >
      
      
      {!task.isEditing && (
        <>
        <label>{task.item}</label>
        <Button
        btnText="Edit"
        btnClass={styles.actionBtn}
        clickHandler={() => {
          isEditingHandler(index);
        }}
        isDisabled={task.isDone}
      />
        </>
      )}
      {task.isEditing && (
        <>
        <Input value={task.editingItem}
        changeHandler={(e) =>{
          inputChangeHandler(index,e.target.value);
        }}
        />
        <Button
        btnText="Save"
        btnClass={styles.actionBtn}
        clickHandler={()=>{
          saveHandler(index);
        }}
        isDisabled={!task.editingItem.length}
        />
        <Button
        btnText="Cancel"
        btnClass={styles.actionBtn}
        clickHandler={()=>{
          cancelHandler(index);
        }}
        />
        
        </>
      )}
      <Button
        btnText="UP"
        btnClass={styles.actionBtn}
        clickHandler={() => {
          swapItemsHandler(index, index - 1);
        }}
        isDisabled={index === 0}
      />
      <Button
        btnText="DOWN"
        btnClass={styles.actionBtn}
        clickHandler={() => {
          swapItemsHandler(index, index + 1);
        }}
        isDisabled={index === list.length-1}
      />
      {!task.isDone && (
        <Button
          btnClass={styles.actionBtn}
          btnText="Done"
          clickHandler={() => {
            isDoneHandler(index);
          }}
          isDisabled={task.isEditing}
        />
      )}
      {task.isDone && (
        <Button
          btnClass={styles.actionBtn}
          btnText="Delete"
          clickHandler={() => {
            deleteHandler();
          }}
        />
      )}
    </li>
  ));

  return <ul style={{ display: "inline-block" }}>{listItem}</ul>;
};

export default List;
