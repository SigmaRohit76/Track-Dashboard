export default function DefectStatus({ status }) {
  return (
    <div className={`p-4 rounded-xl text-center ${status ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}>
      {status ? "⚠️ Defect Detected!" : "✅ Track Healthy"}
    </div>
  );
}
