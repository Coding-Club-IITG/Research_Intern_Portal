// export default function authUrl(role) {
//   return `https://login.microsoftonline.com/850aa78d-94e1-4bc6-9cf3-8c11b530701c/oauth2/v2.0/authorize?client_id=694b6b04-c401-4e85-9a81-fe78f223dede&response_type=code&redirect_uri=https%3A%2F%2Frip.codingclubiitg.in%2Fapi%2F&response_mode=query&scope=https%3A%2F%2Fgraph.microsoft.com%2FFiles.ReadWrite%20https%3A%2F%2Fgraph.microsoft.com%2FUser.Read%20offline_access&state=${role}`;
// }
export default function authUrl(role) {
  return `https://login.microsoftonline.com/850aa78d-94e1-4bc6-9cf3-8c11b530701c/oauth2/v2.0/authorize?client_id=694b6b04-c401-4e85-9a81-fe78f223dede&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2F&response_mode=query&scope=https%3A%2F%2Fgraph.microsoft.com%2FFiles.ReadWrite%20https%3A%2F%2Fgraph.microsoft.com%2FUser.Read%20offline_access&state=${role}`;
}