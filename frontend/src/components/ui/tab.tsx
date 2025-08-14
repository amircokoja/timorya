export interface TabType {
  id: string;
  label: string;
}

interface Props {
  tabs: TabType[];
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const Tab: React.FC<Props> = ({ tabs, activeTab, setActiveTab }: Props) => {
  return (
    <div className="border-b border-gray-200 text-center text-sm font-medium text-gray-500">
      <ul className="-mb-px flex flex-wrap">
        {tabs.map((tab) => (
          <li key={tab.id} className="me-2">
            <a
              href="#"
              className={`inline-block rounded-t-lg border-b-2 p-4 ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tab;
