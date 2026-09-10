import Button from "./components/Button";

export default function Home() {
  return (
    <div className="flex flex-1 justify-center items-center">
      <div>
        <h1 className="font-bold text-3xl">Hello, I&apos;m John Doe</h1>
        <p className="max-w-md">
          A passionate frontend developer with a keen eye for design and a love
          for creating beautiful, functional web experiences.
        </p>
        <div className="flex gap-4 mt-4">
          <Button href="/about">View About</Button>
          <Button href="/projects">View Projects</Button>
        </div>
      </div>
    </div>
  );
}
