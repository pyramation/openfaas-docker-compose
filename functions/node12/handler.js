'use strict'

const { promises: fs } = require('fs');

/**
 * Get Secrets
 *
 * OpenFaaS secrets come from /var/openfaas/secrets. Docker
 * Compose secrets (and old OpenFaaS implementations) come from
 * /var/secrets. This handles both.
 *
 * @link https://docs.openfaas.com/reference/secrets/
 * @param secretName
 * @returns {Promise<undefined|*>}
 */
async function getSecret(secretName) {
  try {
    return await fs.readFile(`/var/openfaas/secrets/${secretName}`, 'utf8');
  } catch {
    return fs.readFile(`/run/secrets/${secretName}`, 'utf8');
  }
}

module.exports = async (event, context) => {
  const result = {
    status: 'Received input: ' + JSON.stringify(event.body),
    secret: await getSecret('example')
  }

  return context
    .status(200)
    .succeed(result)
}
