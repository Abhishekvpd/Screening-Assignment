import CheckboxField from "~/components/CheckboxField";

export default function InterestsPage() {
  return (
    <div className="flex flex-col gap-9">
      <header className="flex flex-col items-center gap-6">
        <h2 className="header-2 self-center">Please mark your interests!</h2>
        <span>We will keep you notified.</span>
      </header>
      <section className="mt-3">
        <span className="text-xl font-medium">My saved interests!</span>
        <CheckboxField />
      </section>
    </div>
  );
}
