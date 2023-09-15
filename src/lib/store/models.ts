import { SnapshotIn, flow, getEnv, getSnapshot, types } from "mobx-state-tree";
import { IPollBaseModel, RootStoreModel, PollDraftModel } from "./types";
import { uploadImage } from "../api/upload-image";

const PollBase = types.model<IPollBaseModel>({
  question: "",
  pictureName: "",
  picture: "",
  options: types.optional(types.map(types.boolean), {}),
});

export const PollDraft = PollBase.actions((self) => ({
  setQuestion(question: string) {
    self.question = question;
  },

  setOption(option: string) {
    self.options.has(option)
      ? self.options.delete(option)
      : self.options.set(option, true);
  },

  setPicture: flow(function* (picture: File) {
    const image = yield uploadImage(picture);
    self.picture = image.url;
  }),

  fillValues(poll: Record<string, any> | undefined) {
    if (!poll) return this.clearValues();

    self.question = poll.question;
    self.picture = poll.picture;
    self.pictureName = poll.pictureName;
    self.options.merge(poll.options);
  },

  clearValues() {
    self.question = "";
    self.picture = "";
    self.pictureName = "";
    self.options.clear();
  },

  publish(i: number) {
    const snapshot = getSnapshot(self);

    const env = getEnv<RootStoreModel>(self);

    env.publishedPolls.publishDraft(i, snapshot);

    return env.publishedPolls;
  },

  previous(i: number) {
    const polls = this.publish(i + 1);

    const existingPoll = polls.getPoll(i);

    this.fillValues(existingPoll);
  },

  next(i: number) {
    const polls = this.publish(i - 1);

    const existingPoll = polls.getPoll(i);

    this.fillValues(existingPoll);
  },
}));

export const PublishedPolls = types
  .model({
    polls: types.optional(types.map(PollBase), {}),
  })
  .actions((self) => ({
    publishDraft(id: number, pollDraft: SnapshotIn<PollDraftModel>) {
      const pollToPublish = pollDraft;

      self.polls.set(`${id}-id`, pollToPublish);
    },

    getPoll(id: number) {
      return self.polls.get(`${id}-id`);
    },

    collectPictures() {
      const env = getEnv<RootStoreModel>(self);
      const pictures: string[] = [];

      env.publishedPolls.polls.forEach((poll) => {
        if (poll.picture.length) pictures.push(poll.picture);
      });

      return pictures;
    },
  }));

export const RootStore = types.model("RootStore", {
  pollDraft: PollDraft,
  publishedPolls: PublishedPolls,
});