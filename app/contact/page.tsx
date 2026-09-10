import Form from "next/form";

export default function Contact() {
  return (
    <div className="flex flex-1 justify-center items-center">
      <div>
        <h1 className="text-3xl font-bold">Contact</h1>
        <Form className="flex flex-col mt-5" action="/form">
          <input className="border px-3 mb-3" name="name" placeholder="Name" />
          <input
            className="border px-3 mb-3"
            name="surname"
            placeholder="Surname"
          />
          <input
            className="border px-3 mb-3"
            name="email"
            placeholder="E-mail"
          />
          <textarea
            className="border px-3 mb-3"
            name="message"
            placeholder="Message"
          />
          <button className="border-1 cursor-pointer" type="submit">
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
}
