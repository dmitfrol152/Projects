export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl text-red-200">Тест стилей Tailwind CSS v4</h1>
        <p className="text-gray-700">
          Если вы видите этот текст с синим заголовком и серым фоном, значит
          глобальные стили работают правильно в Next.js 15!
        </p>
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Тестовая кнопка
        </button>
      </div>
    </div>
  );
}
