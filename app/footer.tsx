export default function PageFooter() {
  return (
    <div className="flex justify-center shadow-sm shadow-gray-600">
      <p className="text-sm py-3 text-gray-300">
        &copy; {new Date().getFullYear()} Ömer Uysal. All rights reserved.
      </p>
    </div>
  );
}
