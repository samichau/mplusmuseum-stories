// This helper uses validation provided by eMarsys

const specialCharacters = '\\(\\)<>@,;:\\\\\\"\\.\\[\\]';
const validCharacters = `[^\\s${specialCharacters}]`;
const atom = `${validCharacters}+`;
const quotedUser = '("[^"]*")';
const word = `(${atom}|${quotedUser})`;

const patterns = {
  email: /^(.+)@(.+)$/,
  user: new RegExp(`^${word}(\\.${word})*$`),
  ipDomain: /^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/,
  domain: new RegExp(`^${atom}(\\.${atom})*$`),
  atom: new RegExp(atom, 'g'),
};

function validateUser(user) {
  const userMatch = user.match(patterns.user);

  if (userMatch === null) {
    return false;
  }

  return true;
}

function validateDomain(domain) {
  const domainMatch = domain.match(patterns.domain);

  if (domainMatch === null) {
    return false;
  }

  return true;
}

function validateIpDomain(domain) {
  const ipDomainMatch = domain.match(patterns.ipDomain);
  if (ipDomainMatch !== null) {
    for (let i = 1; i <= 4; i += 1) {
      if (ipDomainMatch[i] > 255) {
        return false;
      }
    }
    return true;
  }
  return null;
}

export function validateEmail(email) {
  const matches = email.match(patterns.email);

  if (matches === null) return false;

  const user = matches[1];
  const domain = matches[2];

  if (!validateUser(user)) return false;

  // Returns true if valid, false if invalid, null if no match
  // If null an IP domain wasn't detected, so proceeds to domain validation
  const validatedIpDomain = validateIpDomain(domain);
  if (validatedIpDomain === true) {
    return true;
  } else if (validatedIpDomain === false) {
    return false;
  }

  if (!validateDomain(domain)) return false;

  const atomPattern = new RegExp(atom, 'g');
  const domainArray = domain.match(atomPattern);

  if (domainArray.length < 2) return false;

  return true;
}
