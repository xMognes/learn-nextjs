export default function PageFooter() {
  return (
    <div className="flex justify-center bg-white dark:bg-gray-900">
      <p className="py-3">
        &copy; {new Date().getFullYear()} Ömer Uysal. All rights reserved.
      </p>
    </div>
  );
}
