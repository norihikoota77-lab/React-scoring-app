import { useState } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import Header from "./components/Header";
import UploadCard from "./components/UploadCard";
import ResultTable from "./components/ResultTable";
import ScoreCard from "./components/ScoreCard";
import ResultMessage from "./components/ResultMessage";

export default function App() {

  const [correctFile, setCorrectFile] = useState(null);

  const [userFile, setUserFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  const handleSubmit = async () => {

    setResult(null);

    if (!correctFile || !userFile) {

      alert("ファイルを選択してください");

      return;
    }

    const formData = new FormData();

    formData.append(
      "correct_file",
      correctFile
    );

    formData.append(
      "user_file",
      userFile
    );

    try {

      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:8000/api/score/",
        {
          method: "POST",
          body: formData,
        }
      );

      const text = await response.text();

      console.log(text);

      const data = JSON.parse(text);

      setResult(data);

      setCorrectFile(null);
      setUserFile(null);

    } catch (error) {

      console.error(error);

      alert("通信エラー");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-red-950 text-white">

      {loading && <LoadingSpinner />}

      <Header />

      <main className="max-w-6xl mx-auto px-4 py-10">

        <UploadCard
          correctFile={correctFile}
          userFile={userFile}
          setCorrectFile={setCorrectFile}
          setUserFile={setUserFile}
          handleSubmit={handleSubmit}
          loading={loading}
        />

        {result && (

          <>

            {/* RESULT CARD */}

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 mt-8 text-white">
              <h2 className="text-3xl font-extrabold mb-6">

                採点結果

              </h2>


              <div className="grid md:grid-cols-3 gap-6 mb-8">

                <ScoreCard
                  title="スコア"
                  value={result.score}
                />

                <ScoreCard
                  title="正答率"
                  value={`${Number(result.percentage).toFixed(1)}%`}
                  color="text-red-400"
                />

                <ScoreCard
                  title="ランク"
                  value={result.rank}
                  color="text-yellow-300"
                />

              </div>

              <ResultMessage
                rank={result.rank}
                message={result.msg}
              />

            </div>

            {/* RESULT TABLE */}

            {result.video_file && (

              <div className="mt-8">

                <video
                  autoPlay
                  loop
                  muted
                  controls
                  className="
                    w-full
                    rounded-3xl
                    shadow-2xl
                    border
                    border-white/20
                  "
                >

                  <source
                    src={`http://127.0.0.1:8000/static/${result.video_file}`}
                    type="video/mp4"
                  />

                </video>

              </div>

            )}

            <ResultTable
              rowsData={result.rows_data}
            />

          </>

        )}

      </main>

    </div>

  );
}