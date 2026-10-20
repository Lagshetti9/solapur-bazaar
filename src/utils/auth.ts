
export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;

  return localStorage.getItem("accessToken");
}

export function getMobileNumber(): string | null {
  if (typeof window === "undefined") return null;

  return localStorage.getItem("mobileNumber");
}

export function getEmail(): string | null {
  if (typeof window === "undefined") return null;

  return localStorage.getItem("email");
}

export function isLoggedIn(): boolean {
  return Boolean(getAccessToken());
}

export function logout(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem("accessToken");
  localStorage.removeItem("mobileNumber");
  localStorage.removeItem("email");

  window.location.href = "/login";
}
