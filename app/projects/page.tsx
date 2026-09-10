import Box from "../components/Box";
import Image from "next/image";

export default function Projects() {
  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="max-w-7xl">
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="max-w-lg">
          Here you can showcase your best work. Each project should include a
          brief description, the technologies used, and any notable
          achievements. This helps potential clients or employers understand
          your capabilities.
        </p>
        <div className="mt-4">
          <Box>
            <Image
              src="/developer-man.jpg"
              width={200}
              height={200}
              alt="Project-1"
            />
          </Box>
          <Box>
            <Image
              src="/developer-man.jpg"
              width={200}
              height={200}
              alt="Project-1"
            />
          </Box>
          <Box>
            <Image
              src="/developer-man.jpg"
              width={200}
              height={200}
              alt="Project-1"
            />
          </Box>
        </div>
      </div>
    </div>
  );
}
