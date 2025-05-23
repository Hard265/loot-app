/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * The `BigInt` scalar type represents non-fractional whole numeric values.
   * `BigInt` is not constrained to 32-bit like the `Int` type and thus is a less
   * compatible type.
   */
  BigInt: { input: any; output: any; }
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: { input: any; output: any; }
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: { input: any; output: any; }
  /**
   * Leverages the internal Python implementation of UUID (uuid.UUID) to provide native UUID objects
   * in fields, resolvers and input.
   */
  UUID: { input: any; output: any; }
  /**
   * Create scalar that ignores normal serialization/deserialization, since
   * that will be handled by the multipart request spec
   */
  Upload: { input: any; output: any; }
};

/** Returns either a File or a Folder */
export type ContentUnion = FileType | FolderType;

export type CreateFileMutation = {
  __typename?: 'CreateFileMutation';
  file?: Maybe<FileType>;
};

export type CreateFolderMutation = {
  __typename?: 'CreateFolderMutation';
  folder?: Maybe<FolderType>;
};

export type CreateShare = {
  __typename?: 'CreateShare';
  share?: Maybe<ShareType>;
};

export type CreateShareLink = {
  __typename?: 'CreateShareLink';
  shareLink?: Maybe<ShareLinkType>;
};

export type DeleteFileMutation = {
  __typename?: 'DeleteFileMutation';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteFolderMutation = {
  __typename?: 'DeleteFolderMutation';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteShareLinkMutation = {
  __typename?: 'DeleteShareLinkMutation';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DeleteShareMutation = {
  __typename?: 'DeleteShareMutation';
  success?: Maybe<Scalars['Boolean']['output']>;
};

/** An enumeration. */
export enum DriveShareLinkPermissionChoices {
  /** Can edit */
  Edit = 'EDIT',
  /** Can view */
  View = 'VIEW'
}

/** An enumeration. */
export enum DriveSharePermissionChoices {
  /** Can edit */
  Edit = 'EDIT',
  /** Can manage */
  Manage = 'MANAGE',
  /** Can view */
  View = 'VIEW'
}

export type FileType = {
  __typename?: 'FileType';
  /** Date and time when the file was uploaded */
  createdAt: Scalars['DateTime']['output'];
  /** The actual file to upload */
  file: Scalars['String']['output'];
  /** Folder where this file is stored */
  folder?: Maybe<FolderType>;
  hasShareLinks?: Maybe<Scalars['Boolean']['output']>;
  hasShares?: Maybe<Scalars['Boolean']['output']>;
  /** Unique identifier for the file */
  id: Scalars['UUID']['output'];
  /** Automatically detected MIME type of the file */
  mimeType: Scalars['String']['output'];
  /** Display name for the file (defaults to original filename if not provided) */
  name: Scalars['String']['output'];
  /** Shared file (if sharing a file) */
  shareLinks: Array<ShareLinkType>;
  /** Shared file (if sharing a file) */
  shares: Array<ShareType>;
  /** Size of the file in bytes */
  size: Scalars['BigInt']['output'];
  /** User who uploaded this file */
  user?: Maybe<UserType>;
};

export type FolderType = {
  __typename?: 'FolderType';
  /** Date and time when the folder was created */
  createdAt: Scalars['DateTime']['output'];
  /** Folder where this file is stored */
  files: Array<FileType>;
  /** Parent folder if this is a subfolder */
  folders: Array<FolderType>;
  hasShareLinks?: Maybe<Scalars['Boolean']['output']>;
  hasShares?: Maybe<Scalars['Boolean']['output']>;
  /** Unique identifier for the folder */
  id: Scalars['UUID']['output'];
  /** Name of the folder. Allowed characters: letters, numbers, _, -, . */
  name: Scalars['String']['output'];
  /** Parent folder if this is a subfolder */
  parentFolder?: Maybe<FolderType>;
  /** Shared folder (if sharing a folder) */
  shareLinks: Array<ShareLinkType>;
  /** Shared folder (if sharing a folder) */
  shares: Array<ShareType>;
  /** User who owns this folder */
  user?: Maybe<UserType>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createFile?: Maybe<CreateFileMutation>;
  createFolder?: Maybe<CreateFolderMutation>;
  createShare?: Maybe<CreateShare>;
  createShareLink?: Maybe<CreateShareLink>;
  deleteFile?: Maybe<DeleteFileMutation>;
  deleteFolder?: Maybe<DeleteFolderMutation>;
  deleteShare?: Maybe<DeleteShareMutation>;
  deleteShareLink?: Maybe<DeleteShareLinkMutation>;
  refreshToken?: Maybe<Refresh>;
  /** Obtain JSON Web Token mutation */
  tokenAuth?: Maybe<ObtainJsonWebToken>;
  updateFile?: Maybe<UpdateFileMutation>;
  updateFolder?: Maybe<UpdateFolderMutation>;
  updateShare?: Maybe<UpdateShareMutation>;
  updateShareLink?: Maybe<UpdateShareLinkMutation>;
  verifyToken?: Maybe<Verify>;
};


export type MutationCreateFileArgs = {
  file: Scalars['Upload']['input'];
  folderId?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateFolderArgs = {
  name: Scalars['String']['input'];
  parentFolderId?: InputMaybe<Scalars['UUID']['input']>;
};


export type MutationCreateShareArgs = {
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  fileId?: InputMaybe<Scalars['UUID']['input']>;
  folderId?: InputMaybe<Scalars['UUID']['input']>;
  permission?: InputMaybe<Scalars['String']['input']>;
  sharedWithId: Scalars['UUID']['input'];
};


export type MutationCreateShareLinkArgs = {
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  fileId?: InputMaybe<Scalars['UUID']['input']>;
  folderId?: InputMaybe<Scalars['UUID']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  permission?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteFileArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationDeleteFolderArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationDeleteShareArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationDeleteShareLinkArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationRefreshTokenArgs = {
  token?: InputMaybe<Scalars['String']['input']>;
};


export type MutationTokenAuthArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateFileArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateFolderArgs = {
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateShareArgs = {
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['UUID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  permission?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateShareLinkArgs = {
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['UUID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  permission?: InputMaybe<Scalars['String']['input']>;
};


export type MutationVerifyTokenArgs = {
  token?: InputMaybe<Scalars['String']['input']>;
};

/** Obtain JSON Web Token mutation */
export type ObtainJsonWebToken = {
  __typename?: 'ObtainJSONWebToken';
  payload: Scalars['GenericScalar']['output'];
  refreshExpiresIn: Scalars['Int']['output'];
  token: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  contents?: Maybe<Array<Maybe<ContentUnion>>>;
  fileById?: Maybe<FileType>;
  files?: Maybe<Array<Maybe<FileType>>>;
  folderById?: Maybe<FolderType>;
  folders?: Maybe<Array<Maybe<FolderType>>>;
  search?: Maybe<Array<Maybe<ContentUnion>>>;
  shareLink?: Maybe<ShareLinkUnion>;
  shareLinks?: Maybe<Array<Maybe<ShareLinkType>>>;
  shares?: Maybe<Array<Maybe<ShareType>>>;
  viewer?: Maybe<UserType>;
};


export type QueryContentsArgs = {
  folderId?: InputMaybe<Scalars['UUID']['input']>;
};


export type QueryFileByIdArgs = {
  id?: InputMaybe<Scalars['UUID']['input']>;
};


export type QueryFilesArgs = {
  folderId?: InputMaybe<Scalars['UUID']['input']>;
};


export type QueryFolderByIdArgs = {
  id?: InputMaybe<Scalars['UUID']['input']>;
};


export type QueryFoldersArgs = {
  parentFolderId?: InputMaybe<Scalars['UUID']['input']>;
};


export type QuerySearchArgs = {
  query: Scalars['String']['input'];
};


export type QueryShareLinkArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['UUID']['input'];
};

export type Refresh = {
  __typename?: 'Refresh';
  payload: Scalars['GenericScalar']['output'];
  refreshExpiresIn: Scalars['Int']['output'];
  token: Scalars['String']['output'];
};

export type ShareLinkType = {
  __typename?: 'ShareLinkType';
  /** When the share link was created */
  createdAt: Scalars['DateTime']['output'];
  /** User who created the share link */
  createdBy: UserType;
  /** Number of times the item has been downloaded via this link */
  downloadCount: Scalars['Int']['output'];
  /** Optional expiration date for the share link */
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  /** Shared file (if sharing a file) */
  file?: Maybe<FileType>;
  /** Shared folder (if sharing a folder) */
  folder?: Maybe<FolderType>;
  /** Unique identifier for the share link */
  id: Scalars['UUID']['output'];
  /** Whether the share link is currently active */
  isActive: Scalars['Boolean']['output'];
  /** Optional password protection */
  password?: Maybe<Scalars['String']['output']>;
  /** Permission level for the shared item */
  permission: DriveShareLinkPermissionChoices;
};

/** Returns a File or Folder depending on what was shared */
export type ShareLinkUnion = FileType | FolderType;

export type ShareType = {
  __typename?: 'ShareType';
  /** Optional expiration date for the share */
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  /** Shared file (if sharing a file) */
  file?: Maybe<FileType>;
  /** Shared folder (if sharing a folder) */
  folder?: Maybe<FolderType>;
  /** Unique identifier for the share */
  id: Scalars['UUID']['output'];
  /** Whether the share is currently active */
  isActive: Scalars['Boolean']['output'];
  /** Permission level for the shared item */
  permission: DriveSharePermissionChoices;
  /** When the item was shared */
  sharedAt: Scalars['DateTime']['output'];
  /** User who is sharing the item */
  sharedBy: UserType;
  /** User with whom the item is being shared */
  sharedWith: UserType;
  /** Unique token for link-based sharing */
  token: Scalars['String']['output'];
};

export type UpdateFileMutation = {
  __typename?: 'UpdateFileMutation';
  file?: Maybe<FileType>;
};

export type UpdateFolderMutation = {
  __typename?: 'UpdateFolderMutation';
  folder?: Maybe<FolderType>;
};

export type UpdateShareLinkMutation = {
  __typename?: 'UpdateShareLinkMutation';
  shareLink?: Maybe<ShareLinkType>;
};

export type UpdateShareMutation = {
  __typename?: 'UpdateShareMutation';
  share?: Maybe<ShareType>;
};

export type UserType = {
  __typename?: 'UserType';
  email: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
};

export type Verify = {
  __typename?: 'Verify';
  payload: Scalars['GenericScalar']['output'];
};

export type CreateNewFileMutationVariables = Exact<{
  folderId: Scalars['UUID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  file: Scalars['Upload']['input'];
}>;


export type CreateNewFileMutation = { __typename?: 'Mutation', createFile?: { __typename?: 'CreateFileMutation', file?: { __typename?: 'FileType', createdAt: any, file: string, id: any, mimeType: string, name: string, size: any, hasShares?: boolean | null, hasShareLinks?: boolean | null } | null } | null };

export type CreateNewFolderMutationVariables = Exact<{
  parentFolderId?: InputMaybe<Scalars['UUID']['input']>;
  name: Scalars['String']['input'];
}>;


export type CreateNewFolderMutation = { __typename?: 'Mutation', createFolder?: { __typename?: 'CreateFolderMutation', folder?: { __typename?: 'FolderType', createdAt: any, hasShareLinks?: boolean | null, hasShares?: boolean | null, name: string, id: any } | null } | null };

export type ShredFileMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type ShredFileMutation = { __typename?: 'Mutation', deleteFile?: { __typename?: 'DeleteFileMutation', success?: boolean | null } | null };

export type ShredFolderMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type ShredFolderMutation = { __typename?: 'Mutation', deleteFolder?: { __typename?: 'DeleteFolderMutation', success?: boolean | null } | null };

export type GetFileQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetFileQuery = { __typename?: 'Query', fileById?: { __typename?: 'FileType', createdAt: any, file: string, name: string, mimeType: string, id: any, size: any, hasShares?: boolean | null, hasShareLinks?: boolean | null, shareLinks: Array<{ __typename?: 'ShareLinkType', createdAt: any, downloadCount: number, expiresAt?: any | null, id: any, isActive: boolean, password?: string | null, permission: DriveShareLinkPermissionChoices }>, shares: Array<{ __typename?: 'ShareType', id: any, expiresAt?: any | null, isActive: boolean, permission: DriveSharePermissionChoices, sharedAt: any, token: string, sharedBy: { __typename?: 'UserType', email: string, id: any }, sharedWith: { __typename?: 'UserType', email: string, id: any } }> } | null };

export type GetFolderQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetFolderQuery = { __typename?: 'Query', folderById?: { __typename?: 'FolderType', id: any, name: string, hasShares?: boolean | null, hasShareLinks?: boolean | null, createdAt: any, shares: Array<{ __typename?: 'ShareType', id: any, expiresAt?: any | null, isActive: boolean, permission: DriveSharePermissionChoices, sharedAt: any }>, shareLinks: Array<{ __typename?: 'ShareLinkType', createdAt: any, downloadCount: number, expiresAt?: any | null, id: any, isActive: boolean, permission: DriveShareLinkPermissionChoices }> } | null };

export type GetFolderContentsQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetFolderContentsQuery = { __typename?: 'Query', contents?: Array<{ __typename?: 'FileType', id: any, name: string, hasShareLinks?: boolean | null, file: string, createdAt: any, hasShares?: boolean | null, mimeType: string, size: any } | { __typename?: 'FolderType', id: any, name: string, hasShareLinks?: boolean | null, hasShares?: boolean | null, createdAt: any } | null> | null, folderById?: { __typename?: 'FolderType', id: any, name: string, hasShareLinks?: boolean | null, hasShares?: boolean | null, createdAt: any, parentFolder?: { __typename?: 'FolderType', createdAt: any, id: any, name: string, user?: { __typename?: 'UserType', email: string, id: any } | null } | null } | null };

export type GetRootContentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRootContentsQuery = { __typename?: 'Query', contents?: Array<{ __typename?: 'FileType', id: any, name: string, hasShareLinks?: boolean | null, file: string, createdAt: any, hasShares?: boolean | null, mimeType: string, size: any } | { __typename?: 'FolderType', id: any, name: string, hasShareLinks?: boolean | null, hasShares?: boolean | null, createdAt: any } | null> | null };

export type GetShareLinksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetShareLinksQuery = { __typename?: 'Query', shareLinks?: Array<{ __typename?: 'ShareLinkType', createdAt: any, downloadCount: number, expiresAt?: any | null, isActive: boolean, id: any, password?: string | null, permission: DriveShareLinkPermissionChoices, file?: { __typename?: 'FileType', createdAt: any, file: string, mimeType: string, id: any, name: string, size: any } | null, folder?: { __typename?: 'FolderType', createdAt: any, name: string, id: any } | null } | null> | null };

export type GetSharesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSharesQuery = { __typename?: 'Query', shares?: Array<{ __typename?: 'ShareType', expiresAt?: any | null, id: any, isActive: boolean, permission: DriveSharePermissionChoices, sharedAt: any, token: string, sharedBy: { __typename?: 'UserType', email: string, id: any }, sharedWith: { __typename?: 'UserType', email: string, id: any }, file?: { __typename?: 'FileType', createdAt: any, file: string, mimeType: string, id: any, name: string, size: any } | null, folder?: { __typename?: 'FolderType', createdAt: any, id: any, name: string } | null } | null> | null };

export type GetTokenMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type GetTokenMutation = { __typename?: 'Mutation', tokenAuth?: { __typename?: 'ObtainJSONWebToken', payload: any, refreshExpiresIn: number, token: string } | null };

export type PutFileMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
}>;


export type PutFileMutation = { __typename?: 'Mutation', updateFile?: { __typename?: 'UpdateFileMutation', file?: { __typename?: 'FileType', name: string, id: any } | null } | null };

export type PutFolderMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  name: Scalars['String']['input'];
}>;


export type PutFolderMutation = { __typename?: 'Mutation', updateFolder?: { __typename?: 'UpdateFolderMutation', folder?: { __typename?: 'FolderType', name: string, id: any } | null } | null };


export const CreateNewFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateNewFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"folderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"folderId"}}},{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"file"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"hasShares"}},{"kind":"Field","name":{"kind":"Name","value":"hasShareLinks"}}]}}]}}]}}]} as unknown as DocumentNode<CreateNewFileMutation, CreateNewFileMutationVariables>;
export const CreateNewFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateNewFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parentFolderId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFolder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"parentFolderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parentFolderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"folder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"hasShareLinks"}},{"kind":"Field","name":{"kind":"Name","value":"hasShares"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateNewFolderMutation, CreateNewFolderMutationVariables>;
export const ShredFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ShredFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<ShredFileMutation, ShredFileMutationVariables>;
export const ShredFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ShredFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteFolder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<ShredFolderMutation, ShredFolderMutationVariables>;
export const GetFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fileById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"file"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"hasShares"}},{"kind":"Field","name":{"kind":"Name","value":"hasShareLinks"}},{"kind":"Field","name":{"kind":"Name","value":"shareLinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"downloadCount"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"permission"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"permission"}},{"kind":"Field","name":{"kind":"Name","value":"sharedAt"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"sharedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sharedWith"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetFileQuery, GetFileQueryVariables>;
export const GetFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"folderById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"hasShares"}},{"kind":"Field","name":{"kind":"Name","value":"hasShareLinks"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"shares"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"permission"}},{"kind":"Field","name":{"kind":"Name","value":"sharedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shareLinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"downloadCount"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"permission"}}]}}]}}]}}]} as unknown as DocumentNode<GetFolderQuery, GetFolderQueryVariables>;
export const GetFolderContentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFolderContents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"folderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FolderType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"hasShareLinks"}},{"kind":"Field","name":{"kind":"Name","value":"hasShares"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"hasShareLinks"}},{"kind":"Field","name":{"kind":"Name","value":"file"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"hasShares"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"folderById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parentFolder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasShareLinks"}},{"kind":"Field","name":{"kind":"Name","value":"hasShares"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetFolderContentsQuery, GetFolderContentsQueryVariables>;
export const GetRootContentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRootContents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FileType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"hasShareLinks"}},{"kind":"Field","name":{"kind":"Name","value":"file"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"hasShares"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FolderType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"hasShareLinks"}},{"kind":"Field","name":{"kind":"Name","value":"hasShares"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetRootContentsQuery, GetRootContentsQueryVariables>;
export const GetShareLinksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetShareLinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shareLinks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"downloadCount"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"permission"}},{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"file"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"size"}}]}},{"kind":"Field","name":{"kind":"Name","value":"folder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetShareLinksQuery, GetShareLinksQueryVariables>;
export const GetSharesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetShares"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shares"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"permission"}},{"kind":"Field","name":{"kind":"Name","value":"sharedAt"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"sharedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sharedWith"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"file"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"size"}}]}},{"kind":"Field","name":{"kind":"Name","value":"folder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetSharesQuery, GetSharesQueryVariables>;
export const GetTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GetToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenAuth"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"payload"}},{"kind":"Field","name":{"kind":"Name","value":"refreshExpiresIn"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<GetTokenMutation, GetTokenMutationVariables>;
export const PutFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PutFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<PutFileMutation, PutFileMutationVariables>;
export const PutFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PutFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateFolder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"folder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<PutFolderMutation, PutFolderMutationVariables>;