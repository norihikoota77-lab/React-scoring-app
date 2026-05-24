import { motion } from "framer-motion";

export default function ResultTable({
  rowsData,
}) {

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 30,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: 0.5,
      }}

      className="
        mt-10
        bg-white/10
        backdrop-blur-xl
        border
        border-white/20
        rounded-3xl
        shadow-2xl
        overflow-hidden
      "
    >

      <div className="overflow-x-auto">

        <table className="w-full text-white">

          <thead className="bg-black/30">

            <tr>

              <th className="p-4 text-left">
                問題
              </th>

              <th className="p-4 text-left">
                解答
              </th>

              <th className="p-4 text-left">
                正解
              </th>

              <th className="p-4 text-left">
                判定
              </th>

            </tr>

          </thead>

          <tbody>

            {rowsData.map((row, index) => {

              const isCorrect = row[3] === "⭕";

              return (

                <tr
                  key={index}
                  className="
                    border-t
                    border-white/10
                    hover:bg-white/10
                    transition
                  "
                >

                  <td className="p-4 font-bold">

                    {row[0]}

                  </td>

                  <td className="p-4">

                    {row[1]}

                  </td>

                  <td className="p-4">

                    {row[2]}

                  </td>

                  <td
                    className={`
                      p-4
                      text-2xl
                      font-extrabold
                      ${
                        isCorrect
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    `}
                  >

                    {row[3]}

                  </td>

                </tr>

              );
            })}

          </tbody>

        </table>

      </div>

    </motion.div>

  );
}