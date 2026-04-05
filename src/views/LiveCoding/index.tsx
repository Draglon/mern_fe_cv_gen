"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

import isPresent from "@/utils/isPresent";
import { Title } from "@/views/shared/antd/Typography";

type UserProps = {
  id: string;
  name: string;
  email: string;
};

const Home = () => {
  const t = useTranslations("LiveCoding");
  const limit = 3;
  const [users, setUsers] = useState<UserProps[]>([]);
  const [usersFromNextPage, setUsersFromNextPage] = useState<UserProps[]>([]);
  const [page, setPage] = useState<number>(limit);

  const prevPage = () => () => {
    setPage(page - 1);
  };

  const nextPage = () => () => {
    if (isPresent(usersFromNextPage)) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    fetch(
      `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`
    )
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        console.log("response: ", response);
        return response.json();
      })
      .then((data) => setUsers(data))
      .catch((error) => console.error("Fetch error:", error));

    fetch(
      `https://jsonplaceholder.typicode.com/users?_page=${page + 1}&_limit=${limit}`
    )
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => setUsersFromNextPage(data))
      .catch((error) => console.error("Fetch error:", error));
  }, [page]);

  return (
    <div className="page__wrapper">
      <div className="page__block">
        <header className="mb-32">
          <Title className="page__title mt-0">{t("title")}</Title>
        </header>

        <div>
          <ul style={{ marginBottom: "20px" }}>
            {isPresent(users as UserProps[]) &&
              users.map(({ id, name, email }: UserProps) => (
                <li key={id}>
                  {name} - {email}
                </li>
              ))}
          </ul>
          <div
            className="pagination"
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <button type="button" onClick={prevPage()} disabled={page <= 1}>
              {`<`}
            </button>
            <button type="button" disabled={true}>
              {page}
            </button>
            <button
              type="button"
              onClick={nextPage()}
              disabled={!isPresent(usersFromNextPage) || users.length < limit}
            >
              {`>`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
