"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [values, setValues] = useState<string[]>(() => {
    const savedValues = localStorage.getItem("values");
    return savedValues ? JSON.parse(savedValues) : [];
  });

  const [dateValues, setDateValues] = useState<string[]>(() => {
    const savedDateValues = localStorage.getItem("dateValues");
    return savedDateValues ? JSON.parse(savedDateValues) : [];
  });

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [editDateValue, setEditDateValue] = useState<string>("");
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    localStorage.setItem("values", JSON.stringify(values));
  }, [values]);

  useEffect(() => {
    localStorage.setItem("dateValues", JSON.stringify(dateValues));
  }, [dateValues]);

  const handleCreatePlan = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = e.currentTarget.querySelector("input[type='text']") as HTMLInputElement;
    const dateInput = e.currentTarget.querySelector("input[type='date']") as HTMLInputElement;

    if (input && dateInput) {
      const inputValues = input.value;
      const dateInputValues = dateInput.value;

      setValues([...values, inputValues]);
      setDateValues([...dateValues, dateInputValues]);

      input.value = "";
      dateInput.value = "";
    }
  };

  const handleDelete = (index: number) => {
    const newValues = values.filter((item, i) => i !== index);
    const newDateValues = dateValues.filter((item, i) => i !== index);
    setDateValues(newDateValues);
    setValues(newValues);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditValue(values[index]);
    setEditDateValue(dateValues[index]);
  };

  const handleSaveEdit = () => {
    if (editIndex !== null) {
      const newValues = [...values];
      const newDateValues = [...dateValues];
      newValues[editIndex] = editValue;
      newDateValues[editIndex] = editDateValue;
      setValues(newValues);
      setDateValues(newDateValues);
      setEditIndex(null);
      setEditValue("");
      setEditDateValue("");
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <form className={styles.form} onSubmit={handleCreatePlan}>
          <input className={styles.inputField} type="text" placeholder="Create" />
          <input className={styles.inputField} type="date" />
          <button className={styles.submitButton} type="submit">Submit</button>
        </form>
      </div>
      <div className={styles.planContainer}>
        {values.map((item, index) => (
          <div key={index}>
            <img
              width={100}
              height={100}
              src="./[removal.ai]_395db3b5-06be-4e8e-bd14-9854a016c461-chjpdmf0zs9sci9pbwfnzxmvd2vic2l0zs8ymdizltayl2pvyjk2oc1lbgvtzw50ltewmc1wlnbuzw.png"
              alt="panda"
              className={styles.image}
            />
            {editIndex === index ? (
              <div className={styles.editContainer}>
                <textarea
                  className={styles.textEditField}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <input
                  className={styles.inputEditField}
                  type="date"
                  value={editDateValue}
                  onChange={(e) => setEditDateValue(e.target.value)}
                />
                <button className={styles.saveButton} onClick={handleSaveEdit}>Save</button>
              </div>
            ) : (
              <div className={styles.planItem}>
                <span>{item}</span>
                <span>Date: {dateValues[index]}</span>
                <button className={styles.deleteButton} onClick={() => handleDelete(index)}>Sil</button>
                <button className={styles.editButton} onClick={() => handleEdit(index)}>Düzenle</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
