import CheckboxField from "~/components/CheckboxField";
import Paginator from "~/components/Paginator";

export default function InterestsPage() {
  const data = [
    { id: "1", interest: "asasda", checked: false },
    { id: "2", interest: "asasda", checked: false },
    { id: "3", interest: "asasda", checked: false },
    { id: "4", interest: "asasda", checked: true },
    { id: "5", interest: "asasda", checked: false },
    { id: "6", interest: "asasda", checked: false },
  ];
  return (
    <div className="flex flex-col gap-9">
      <header className="flex flex-col items-center gap-6">
        <h2 className="header-2 self-center">Please mark your interests!</h2>
        <span>We will keep you notified.</span>
      </header>
      <section className="mt-3">
        <span className="text-xl font-medium">My saved interests!</span>
        <div className="mt-7 flex flex-col gap-6">
          {data.map((item) => (
            <CheckboxField {...item} />
          ))}
        </div>
      </section>
      <div className="mt-8">
        <Paginator />
      </div>
    </div>
  );
}
