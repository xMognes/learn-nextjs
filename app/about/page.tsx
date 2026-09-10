import Image from "next/image";

export default function About() {
  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="flex items-center">
        <div>
          <h1 className="text-3xl font-bold">About</h1>
          <p className="max-w-md">
            This is where you can introduce yourself or your company. Share your
            story, mission, and values. Explain what makes you unique and why
            people should be interested in your work. Keep it concise but
            engaging.
          </p>
        </div>
        <Image
          src="/developer-man.jpg"
          width={200}
          height={200}
          alt="Profile Image"
          className="ml-10"
        />
      </div>
    </div>
  );
}
