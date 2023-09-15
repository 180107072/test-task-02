"use client";

import { getSnapshot } from "mobx-state-tree";
import { PublishedPolls, RootStore, PollDraft } from "./models";
import { RootStoreEnv, RootStoreModel } from "./types";

export const createStore = (): RootStoreModel => {
  const publishedPolls = PublishedPolls.create();
  const pollDraft = PollDraft.create();

  const env: RootStoreEnv = { publishedPolls };

  const rootStore = RootStore.create(
    {
      publishedPolls: getSnapshot(publishedPolls),
      pollDraft: getSnapshot(pollDraft),
    },
    env
  );

  return rootStore;
};
