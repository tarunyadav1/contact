import React, { useState } from "react";
import styles from "./form.module.css";

const From = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(state),
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setStatus("SUCCESS");
      })
      .catch((error) => {
        console.error(error);
        setStatus("ERROR");
      });
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  if (status === "SUCCESS") {
    return (
      <div className={styles.success}>
        <p> Message sent!</p>

        <a href="/">
          <button
            onClick={() => {
              setStatus("");
              // setLoading(false);
            }}
          >
            Submit Another response
          </button>
        </a>
      </div>
    );
  }

  return (
    <>
      <form
        className={`${styles.form} ${loading && styles.pending}`}
        onSubmit={handleSubmit}
      >
        <label className={styles.label}>Name</label>
        <input
          value={state.name}
          onChange={handleChange}
          className={styles.input}
          type="text"
          name="name"
        />
        <label className={styles.label}>Email</label>
        <input
          value={state.email}
          onChange={handleChange}
          className={styles.input}
          type="email"
          name="email"
        />

        <label className={styles.label}>Subject</label>
        <input
          value={state.subject}
          onChange={handleChange}
          className={styles.input}
          type="text"
          name="subject"
        />
        <label className={styles.label}>Message</label>
        <textarea
          value={state.message}
          onChange={handleChange}
          className={styles.input}
          name="message"
        />
        <button className={styles.button}>Submit</button>
      </form>
    </>
  );
};

export default From;
