import Box from "../_components/Box";
import Image from "next/image";

export default function Projects() {
  return (
    <div className="content">
      <h1 className="page-title">Projects</h1>
      <p className="max-w-lg">
        Here you can showcase your best work. Each project should include a
        brief description, the technologies used, and any notable achievements.
        This helps potential clients or employers understand your capabilities.
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
  );
}
