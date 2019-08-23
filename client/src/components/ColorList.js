import React, { useState } from "react";
import AxiosAuth from "../hooks/AxiosAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [isError, setIsError] = useState(false);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };


  const reviseData = colorToEdit => {
    return AxiosAuth().put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
        console.log(res);
        console.log(res);
        updateColors(colors.map(color => (color.id === colorToEdit.id ? colorToEdit : color)));
        
      })

    
  };

  const saveEdit = e => {
    e.preventDefault();
    reviseData(colorToEdit)
    console.log(colorToEdit)
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    return AxiosAuth().delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(res => {
        console.log(res);
        console.log(res);
        updateColors(colors.filter(col => col.id !== color.id));
      })    
    // make a delete request to delete this color
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
