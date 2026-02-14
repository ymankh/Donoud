import { useEffect, useState } from "react";
import { GiSwan } from "react-icons/gi";
import { toast } from "react-toastify";
import { useFilter } from "@/shared/hooks/useFilter";

const sentences = [
  "Cease interfering with the swan's territory! 🛑",
  "Quit disturbing the swan's serene environment! ❌",
  "Desist from agitating the swan! 🚫",
  "Halt provoking the swan's tranquility! 🛑",
  "Refrain from bothering the graceful swan! 🦢",
  "Stop irritating the elegant swan! 😡",
  "Cease disrupting the swan's peaceful demeanor! 🚫",
  "Quit bothering the majestic swan! 🛑",
  "Desist from disturbing the swan's graceful glide! ❌",
  "Halt interfering with the serene presence of the swan! 🦢",
];

const Navbar = () => {
  const [clicksCounter, setClickCounter] = useState(0);
  const { filter, setFilter } = useFilter();
  // Function that returns a random sentence/message
  const getRandomIndex = () => {
    return sentences[Math.floor(Math.random() * sentences.length)];
  };
  const onClick = () => {
    setClickCounter((prevCounter) =>
      prevCounter + 1 <= 3 ? prevCounter + 1 : 0
    );
    if (clicksCounter >= 3) {
      toast.warning(getRandomIndex());
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      setClickCounter((prevCounter) =>
        prevCounter - 1 >= 0 ? prevCounter - 1 : 0
      );
    }, 1000);

    return () => {
      clearInterval(intervalId); // Clean up the interval when the component unmounts
    };
  }, []);

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <span className="navbar-brand">
          <span style={{ fontSize: 30 }}>
            <GiSwan onClick={onClick} />
          </span>{" "}
          DoNoud
        </span>
        <form
          className="d-flex"
          role="search"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="form-control me-1"
            style={{ width: "150px" }}
            type="search"
            placeholder="Filter"
            aria-label="Search"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          />
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
