type Props = {
  title: string;
  value: string;
};

export default function AnalyticsCard({
  title,
  value,
}: Props) {

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition">

      <h3 className="text-gray-400">
        {title}
      </h3>

      <p className="text-5xl font-bold mt-4">
        {value}
      </p>

    </div>
  );
}