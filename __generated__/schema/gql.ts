/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation CreateFile($folderId: UUID!, $name: String, $file: Upload!) {\n  createFile(folderId: $folderId, file: $file, name: $name) {\n    file {\n      createdAt\n      file\n      id\n      mimeType\n      name\n      size\n      hasShares\n      hasShareLinks\n    }\n  }\n}": typeof types.CreateFileDocument,
    "mutation CreateFolder($parentFolderId: UUID, $name: String!) {\n  createFolder(name: $name, parentFolderId: $parentFolderId) {\n    folder {\n      createdAt\n      hasShareLinks\n      hasShares\n      name\n      id\n    }\n  }\n}": typeof types.CreateFolderDocument,
    "mutation DeleteFile($id: UUID!) {\n  deleteFile(id: $id) {\n    success\n  }\n}": typeof types.DeleteFileDocument,
    "mutation DeleteFolder($id: UUID!) {\n  deleteFolder(id: $id) {\n    success\n  }\n}": typeof types.DeleteFolderDocument,
    "query GetFile($id: UUID!) {\n  fileById(id: $id) {\n    createdAt\n    file\n    name\n    mimeType\n    id\n    size\n    hasShares\n    hasShareLinks\n    shareLinks {\n      createdAt\n      downloadCount\n      expiresAt\n      id\n      isActive\n      password\n      permission\n    }\n    shares {\n      id\n      expiresAt\n      isActive\n      permission\n      sharedAt\n      token\n      sharedBy {\n        email\n        id\n      }\n      sharedWith {\n        email\n        id\n      }\n    }\n  }\n}": typeof types.GetFileDocument,
    "query GetFolderContents($id: UUID!) {\n  contents(folderId: $id) {\n    ... on FolderType {\n      id\n      name\n      hasShareLinks\n      hasShares\n      createdAt\n    }\n    ... on FileType {\n      id\n      name\n      hasShareLinks\n      file\n      createdAt\n      hasShares\n      mimeType\n      size\n    }\n  }\n  folderById(id: $id) {\n    id\n    name\n    parentFolder {\n      createdAt\n      id\n      name\n      user {\n        email\n        id\n      }\n    }\n    hasShareLinks\n    hasShares\n    createdAt\n  }\n}": typeof types.GetFolderContentsDocument,
    "query GetRootContents {\n  contents {\n    ... on FileType {\n      id\n      name\n      hasShareLinks\n      file\n      createdAt\n      hasShares\n      mimeType\n      size\n    }\n    ... on FolderType {\n      id\n      name\n      hasShareLinks\n      hasShares\n      createdAt\n    }\n  }\n}": typeof types.GetRootContentsDocument,
    "query GetShareLinks {\n  shareLinks {\n    createdAt\n    downloadCount\n    expiresAt\n    isActive\n    id\n    password\n    permission\n    file {\n      createdAt\n      file\n      mimeType\n      id\n      name\n      size\n    }\n    folder {\n      createdAt\n      name\n      id\n    }\n  }\n}": typeof types.GetShareLinksDocument,
    "query GetShares {\n  shares {\n    expiresAt\n    id\n    isActive\n    permission\n    sharedAt\n    token\n    sharedBy {\n      email\n      id\n    }\n    sharedWith {\n      email\n      id\n    }\n    file {\n      createdAt\n      file\n      mimeType\n      id\n      name\n      size\n    }\n    folder {\n      createdAt\n      id\n      name\n    }\n  }\n}": typeof types.GetSharesDocument,
    "mutation UpdateFile($id: UUID!, $name: String!) {\n  updateFile(id: $id, name: $name) {\n    file {\n      name\n      id\n    }\n  }\n}": typeof types.UpdateFileDocument,
    "mutation UpdateFolder($id: UUID!, $name: String!) {\n  updateFolder(id: $id, name: $name) {\n    folder {\n      name\n      id\n    }\n  }\n}": typeof types.UpdateFolderDocument,
};
const documents: Documents = {
    "mutation CreateFile($folderId: UUID!, $name: String, $file: Upload!) {\n  createFile(folderId: $folderId, file: $file, name: $name) {\n    file {\n      createdAt\n      file\n      id\n      mimeType\n      name\n      size\n      hasShares\n      hasShareLinks\n    }\n  }\n}": types.CreateFileDocument,
    "mutation CreateFolder($parentFolderId: UUID, $name: String!) {\n  createFolder(name: $name, parentFolderId: $parentFolderId) {\n    folder {\n      createdAt\n      hasShareLinks\n      hasShares\n      name\n      id\n    }\n  }\n}": types.CreateFolderDocument,
    "mutation DeleteFile($id: UUID!) {\n  deleteFile(id: $id) {\n    success\n  }\n}": types.DeleteFileDocument,
    "mutation DeleteFolder($id: UUID!) {\n  deleteFolder(id: $id) {\n    success\n  }\n}": types.DeleteFolderDocument,
    "query GetFile($id: UUID!) {\n  fileById(id: $id) {\n    createdAt\n    file\n    name\n    mimeType\n    id\n    size\n    hasShares\n    hasShareLinks\n    shareLinks {\n      createdAt\n      downloadCount\n      expiresAt\n      id\n      isActive\n      password\n      permission\n    }\n    shares {\n      id\n      expiresAt\n      isActive\n      permission\n      sharedAt\n      token\n      sharedBy {\n        email\n        id\n      }\n      sharedWith {\n        email\n        id\n      }\n    }\n  }\n}": types.GetFileDocument,
    "query GetFolderContents($id: UUID!) {\n  contents(folderId: $id) {\n    ... on FolderType {\n      id\n      name\n      hasShareLinks\n      hasShares\n      createdAt\n    }\n    ... on FileType {\n      id\n      name\n      hasShareLinks\n      file\n      createdAt\n      hasShares\n      mimeType\n      size\n    }\n  }\n  folderById(id: $id) {\n    id\n    name\n    parentFolder {\n      createdAt\n      id\n      name\n      user {\n        email\n        id\n      }\n    }\n    hasShareLinks\n    hasShares\n    createdAt\n  }\n}": types.GetFolderContentsDocument,
    "query GetRootContents {\n  contents {\n    ... on FileType {\n      id\n      name\n      hasShareLinks\n      file\n      createdAt\n      hasShares\n      mimeType\n      size\n    }\n    ... on FolderType {\n      id\n      name\n      hasShareLinks\n      hasShares\n      createdAt\n    }\n  }\n}": types.GetRootContentsDocument,
    "query GetShareLinks {\n  shareLinks {\n    createdAt\n    downloadCount\n    expiresAt\n    isActive\n    id\n    password\n    permission\n    file {\n      createdAt\n      file\n      mimeType\n      id\n      name\n      size\n    }\n    folder {\n      createdAt\n      name\n      id\n    }\n  }\n}": types.GetShareLinksDocument,
    "query GetShares {\n  shares {\n    expiresAt\n    id\n    isActive\n    permission\n    sharedAt\n    token\n    sharedBy {\n      email\n      id\n    }\n    sharedWith {\n      email\n      id\n    }\n    file {\n      createdAt\n      file\n      mimeType\n      id\n      name\n      size\n    }\n    folder {\n      createdAt\n      id\n      name\n    }\n  }\n}": types.GetSharesDocument,
    "mutation UpdateFile($id: UUID!, $name: String!) {\n  updateFile(id: $id, name: $name) {\n    file {\n      name\n      id\n    }\n  }\n}": types.UpdateFileDocument,
    "mutation UpdateFolder($id: UUID!, $name: String!) {\n  updateFolder(id: $id, name: $name) {\n    folder {\n      name\n      id\n    }\n  }\n}": types.UpdateFolderDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation CreateFile($folderId: UUID!, $name: String, $file: Upload!) {\n  createFile(folderId: $folderId, file: $file, name: $name) {\n    file {\n      createdAt\n      file\n      id\n      mimeType\n      name\n      size\n      hasShares\n      hasShareLinks\n    }\n  }\n}"): (typeof documents)["mutation CreateFile($folderId: UUID!, $name: String, $file: Upload!) {\n  createFile(folderId: $folderId, file: $file, name: $name) {\n    file {\n      createdAt\n      file\n      id\n      mimeType\n      name\n      size\n      hasShares\n      hasShareLinks\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation CreateFolder($parentFolderId: UUID, $name: String!) {\n  createFolder(name: $name, parentFolderId: $parentFolderId) {\n    folder {\n      createdAt\n      hasShareLinks\n      hasShares\n      name\n      id\n    }\n  }\n}"): (typeof documents)["mutation CreateFolder($parentFolderId: UUID, $name: String!) {\n  createFolder(name: $name, parentFolderId: $parentFolderId) {\n    folder {\n      createdAt\n      hasShareLinks\n      hasShares\n      name\n      id\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation DeleteFile($id: UUID!) {\n  deleteFile(id: $id) {\n    success\n  }\n}"): (typeof documents)["mutation DeleteFile($id: UUID!) {\n  deleteFile(id: $id) {\n    success\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation DeleteFolder($id: UUID!) {\n  deleteFolder(id: $id) {\n    success\n  }\n}"): (typeof documents)["mutation DeleteFolder($id: UUID!) {\n  deleteFolder(id: $id) {\n    success\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetFile($id: UUID!) {\n  fileById(id: $id) {\n    createdAt\n    file\n    name\n    mimeType\n    id\n    size\n    hasShares\n    hasShareLinks\n    shareLinks {\n      createdAt\n      downloadCount\n      expiresAt\n      id\n      isActive\n      password\n      permission\n    }\n    shares {\n      id\n      expiresAt\n      isActive\n      permission\n      sharedAt\n      token\n      sharedBy {\n        email\n        id\n      }\n      sharedWith {\n        email\n        id\n      }\n    }\n  }\n}"): (typeof documents)["query GetFile($id: UUID!) {\n  fileById(id: $id) {\n    createdAt\n    file\n    name\n    mimeType\n    id\n    size\n    hasShares\n    hasShareLinks\n    shareLinks {\n      createdAt\n      downloadCount\n      expiresAt\n      id\n      isActive\n      password\n      permission\n    }\n    shares {\n      id\n      expiresAt\n      isActive\n      permission\n      sharedAt\n      token\n      sharedBy {\n        email\n        id\n      }\n      sharedWith {\n        email\n        id\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetFolderContents($id: UUID!) {\n  contents(folderId: $id) {\n    ... on FolderType {\n      id\n      name\n      hasShareLinks\n      hasShares\n      createdAt\n    }\n    ... on FileType {\n      id\n      name\n      hasShareLinks\n      file\n      createdAt\n      hasShares\n      mimeType\n      size\n    }\n  }\n  folderById(id: $id) {\n    id\n    name\n    parentFolder {\n      createdAt\n      id\n      name\n      user {\n        email\n        id\n      }\n    }\n    hasShareLinks\n    hasShares\n    createdAt\n  }\n}"): (typeof documents)["query GetFolderContents($id: UUID!) {\n  contents(folderId: $id) {\n    ... on FolderType {\n      id\n      name\n      hasShareLinks\n      hasShares\n      createdAt\n    }\n    ... on FileType {\n      id\n      name\n      hasShareLinks\n      file\n      createdAt\n      hasShares\n      mimeType\n      size\n    }\n  }\n  folderById(id: $id) {\n    id\n    name\n    parentFolder {\n      createdAt\n      id\n      name\n      user {\n        email\n        id\n      }\n    }\n    hasShareLinks\n    hasShares\n    createdAt\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetRootContents {\n  contents {\n    ... on FileType {\n      id\n      name\n      hasShareLinks\n      file\n      createdAt\n      hasShares\n      mimeType\n      size\n    }\n    ... on FolderType {\n      id\n      name\n      hasShareLinks\n      hasShares\n      createdAt\n    }\n  }\n}"): (typeof documents)["query GetRootContents {\n  contents {\n    ... on FileType {\n      id\n      name\n      hasShareLinks\n      file\n      createdAt\n      hasShares\n      mimeType\n      size\n    }\n    ... on FolderType {\n      id\n      name\n      hasShareLinks\n      hasShares\n      createdAt\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetShareLinks {\n  shareLinks {\n    createdAt\n    downloadCount\n    expiresAt\n    isActive\n    id\n    password\n    permission\n    file {\n      createdAt\n      file\n      mimeType\n      id\n      name\n      size\n    }\n    folder {\n      createdAt\n      name\n      id\n    }\n  }\n}"): (typeof documents)["query GetShareLinks {\n  shareLinks {\n    createdAt\n    downloadCount\n    expiresAt\n    isActive\n    id\n    password\n    permission\n    file {\n      createdAt\n      file\n      mimeType\n      id\n      name\n      size\n    }\n    folder {\n      createdAt\n      name\n      id\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetShares {\n  shares {\n    expiresAt\n    id\n    isActive\n    permission\n    sharedAt\n    token\n    sharedBy {\n      email\n      id\n    }\n    sharedWith {\n      email\n      id\n    }\n    file {\n      createdAt\n      file\n      mimeType\n      id\n      name\n      size\n    }\n    folder {\n      createdAt\n      id\n      name\n    }\n  }\n}"): (typeof documents)["query GetShares {\n  shares {\n    expiresAt\n    id\n    isActive\n    permission\n    sharedAt\n    token\n    sharedBy {\n      email\n      id\n    }\n    sharedWith {\n      email\n      id\n    }\n    file {\n      createdAt\n      file\n      mimeType\n      id\n      name\n      size\n    }\n    folder {\n      createdAt\n      id\n      name\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation UpdateFile($id: UUID!, $name: String!) {\n  updateFile(id: $id, name: $name) {\n    file {\n      name\n      id\n    }\n  }\n}"): (typeof documents)["mutation UpdateFile($id: UUID!, $name: String!) {\n  updateFile(id: $id, name: $name) {\n    file {\n      name\n      id\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation UpdateFolder($id: UUID!, $name: String!) {\n  updateFolder(id: $id, name: $name) {\n    folder {\n      name\n      id\n    }\n  }\n}"): (typeof documents)["mutation UpdateFolder($id: UUID!, $name: String!) {\n  updateFolder(id: $id, name: $name) {\n    folder {\n      name\n      id\n    }\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;