import MarketingGenerator from '../../components/features/MarketingGenerator';

export default function MarketingPage() {
  return (
    <div className="space-y-8">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-slate-900">AI Marketing Studio</h1>
        <p className="text-slate-500 mt-2">Generate viral social media posts, ad copy, and email campaigns in seconds.</p>
      </div>

      <MarketingGenerator />
    </div>
  );
}