import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import { LanguageFlag } from "../LanguageFlag/LanguageFlag";

export const LanguagePairRow = ({ item, onDelete }) => {
  return (
    <tr>
      <td className="border border-gray-300 px-4 py-2">
        <div className="flex gap-5">
          <LanguageFlag
            countryCode={item.sourceLanguage.flagCode}
            className="w-8 h-8"
          />
          <span className="flex items-center">{item.sourceLanguage.codeIso.toUpperCase()}</span>
        </div>
      </td>

      <td className="border border-gray-300 px-4 py-2">
        <div className="flex gap-5">
          <LanguageFlag
            countryCode={item.targetLanguage.flagCode}
            className="w-8 h-8"
          />
          <span className="flex items-center">{item.targetLanguage.codeIso.toUpperCase()}</span>
        </div>
      </td>

      <td className="border border-gray-300 px-4 py-2">
        <Link to="/users" className="text-blue-500 hover:underline">View Translators</Link>
      </td>

      <td className="border border-gray-300 px-4 py-2">
        <div className="flex justify-around gap-2">
          <Link to={`/language-pairs/update/${item.id}`}>
            <Button
              text="Update"
              colorClass="bg-yellow-500 text-white hover:bg-yellow-600"
              onClick={() => console.log(`Update ${item.id}`)}
            />
          </Link>
          <Button
            text="Delete"
            colorClass="bg-red-500 text-white hover:bg-red-600"
            onClick={() => onDelete(item.id)}
          />
        </div>
      </td>
    </tr>
  );
};
