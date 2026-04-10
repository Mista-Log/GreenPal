"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import AppTopBar from "@/components/AppTopBar";
import { profileSummary, farmGoals, FarmGoal } from "@/lib/mock-data";
import { getMe, getUserCommunities, Community } from "@/lib/api";


type UserProfile = {
  id: string;
  full_name: string;
  email: string;
  created_at: string;
};



export default function YouPage() {
  const { t } = useTranslation();


  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const joinedYear = user?.created_at
    ? new Date(user.created_at).getFullYear()
    : "";
  // const community = [
  //   { id: "comm_1", title: "Knowledge Sharing", image: "/figma/you-community-1.png" },
  //   { id: "comm_2", title: "Farmer Collaboration", image: "/figma/you-community-2.png" },
  //   { id: "comm_3", title: "Local Market Updates", image: "/figma/you-community-3.png" },
  //   { id: "comm_4", title: "Community Support", image: "/figma/you-community-4.png" },
  //   { id: "comm_5", title: "Farm Discussions", image: "/figma/you-community-5.png" },
  // ];

  const [communities, setCommunities] = useState<Community[]>([]);

  const defaultCommunityImages = [
    "/figma/you-community-1.png",
    "/figma/you-community-2.png",
    "/figma/you-community-3.png",
    "/figma/you-community-4.png",
    "/figma/you-community-5.png",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getMe();
        setUser(userData);

        const userCommunities = await getUserCommunities();

        // Assign default images if image is missing
        const communitiesWithImages = userCommunities.map((c, i) => ({
          ...c,
          image: c.image || defaultCommunityImages[i % defaultCommunityImages.length],
        }));

        setCommunities(communitiesWithImages);
      } catch (err: any) {
        console.error(err);
      }
    };

    fetchData();


  }, []);


  const displayGoals = farmGoals.slice(0, 5);

  const badges = [
    { id: "badge_1", title: "Goal Title", subtitle: "Goal Subtitle" },
    { id: "badge_2", title: "Goal Title", subtitle: "Goal Subtitle" },
    { id: "badge_3", title: "Goal Title", subtitle: "Goal Subtitle" },
    { id: "badge_4", title: "Goal Title", subtitle: "Goal Subtitle" },
    { id: "badge_5", title: "Goal Title", subtitle: "Goal Subtitle" },
  ];

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const data = await getMe();
  //       setUser(data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   fetchUser(); // initial fetch

  //   const interval = setInterval(fetchUser, 5000); // every 5 sec


  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <div className="relative mx-auto min-h-screen w-full max-w-(--app-shell-max) pb-35">
        <header className="sticky top-0 z-20 bg-background">
          <AppTopBar />
        </header>

        <main className="px-4 pt-4 md:px-6 space-y-8">
          <section className="rounded-2xl bg-surface-container-low px-4 py-5">
            <div className="mb-6">
              <Image
                src="/figma/you-logo.svg"
                alt=""
                width={25}
                height={31}
                unoptimized
              />
            </div>
            <p className="text-xl font-normal leading-7 tracking-tight text-on-surface">
              {user?.full_name}
            </p>

            <div className="mt-2.5 text-xs font-medium leading-4 tracking-wide text-on-surface-variant">
              {t("you.joined", {
                year: joinedYear,
                email: user?.email || "No Email",
              })}
            </div>
            <Link 
              href="/account-settings"
              className="mt-2 text-xs font-bold leading-4 tracking-wide text-primary hover:underline"
            >
              {t("you.edit_profile")}
            </Link>
          </section>

          <section>
            <p className="mb-3 text-base font-medium leading-6 tracking-wide text-on-surface-variant">
              {t("you.community")}
            </p>
            <div className="no-scrollbar flex gap-2.5 overflow-x-auto">
              {communities.map((item, index) => (
                <div
                  key={item.id}
                  className="relative h-44.25 w-33.25 shrink-0 overflow-hidden rounded-xl"
                >
                  <Image
                    src={item.image!}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="133px"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/50 to-black/70" />
                  <p className="absolute bottom-3 left-1.75 text-xs font-medium leading-4 tracking-wide text-white">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-3">
              <p className="text-base font-medium leading-6 tracking-wide text-on-surface-variant">
                {t("you.growth_targets")}
              </p>
              <Link
                href="/goals"
                className="text-sm font-medium tracking-wide text-primary transition-colors hover:text-primary/80"
              >
                {t("tips.see_all")}
              </Link>
            </div>
            <div className="no-scrollbar flex gap-2.5 overflow-x-auto">
              {displayGoals.map((goal: FarmGoal) => (
                <Link
                  key={goal.id}
                  href={`/goals/${goal.id}`}
                  className="flex h-44 w-33.25 shrink-0 flex-col rounded-xl bg-surface-container-low p-3 transition-colors hover:bg-surface-container"
                >
                  <span className="material-symbols-rounded text-xl text-on-surface-variant">
                    {goal.icon}
                  </span>
                  <div className="mt-auto">
                    <p className="line-clamp-2 text-xs font-medium leading-4 tracking-wide text-on-surface">
                      {goal.title}
                    </p>
                    <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                      {goal.currentValue.toLocaleString()} / {goal.targetValue.toLocaleString()} {goal.unit}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-base font-medium leading-6 tracking-wide text-on-surface-variant">
                {t("you.badges")}
              </p>
              <button className="text-sm font-medium leading-5 tracking-wide text-primary hover:underline">
                {t("tips.see_all")}
              </button>
            </div>
            <div className="no-scrollbar flex gap-2.5 overflow-x-auto">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex w-32.5 shrink-0 flex-col items-center gap-3"
                >
                  <div className="flex aspect-square w-32.5 items-center justify-center rounded-full bg-on-primary-container">
                    <div className="h-20 w-20 rounded-full bg-primary" />
                  </div>
                  <div className="text-center text-xs font-medium leading-4 tracking-wide text-on-surface">
                    {badge.title}
                  </div>
                  <div className="text-center text-[10px] leading-tight text-secondary-container">
                    {badge.subtitle}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}