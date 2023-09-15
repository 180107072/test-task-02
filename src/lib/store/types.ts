import {
  ModelPropertiesDeclaration,
  Instance,
  IMapType,
  IOptionalIType,
  ISimpleType,
} from "mobx-state-tree";
import { PollDraft, RootStore, PublishedPolls } from "./models";

export interface IPollBaseModel extends ModelPropertiesDeclaration {
  question: string;
  pictureName: string;
  picture: string;
  options: IOptionalIType<IMapType<ISimpleType<boolean>>, [undefined]>;
}

export interface IPollBaseVolatileModel {
  picture: File | null;
}

// Instance is a typescript helper that extracts the type of the model instance
export type PollDraftModel = Instance<typeof PollDraft>;
export type RootStoreModel = Instance<typeof RootStore>;
export type PublishedPollsModel = Instance<typeof PublishedPolls>;

export type RootStoreEnv = {
  publishedPolls: PublishedPollsModel;
};
