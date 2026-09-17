import Form from "next/form";

export default function Contact() {
  return (
    <div className="content">
      <h1 className="page-title">Contact</h1>
      <Form className="flex flex-col gap-2 mt-5" action="/form">
        <div className="flex gap-3">
          <input
            className="form-input"
            name="name"
            placeholder="Name"
            required
          />
          <input
            className="form-input"
            name="surname"
            placeholder="Surname"
            required
          />
        </div>
        <input
          className="form-input"
          name="email"
          placeholder="E-mail"
          required
        />
        <textarea
          className="form-input"
          name="message"
          placeholder="Message"
          required
        />
        <button className="form-button mt-2 ml-auto" type="submit">
          Submit
        </button>
      </Form>
    </div>
  );
}
