// Copyright (c) Microsoft Corporation and others. Licensed under the MIT license.
// SPDX-License-Identifier: MIT
const expect = require('chai').expect
const sinon = require('sinon')
const GoFetch = require('../../../../providers/fetch/goFetch')
const PassThrough = require('stream').PassThrough
const proxyquire = require('proxyquire')
const Request = require('../../../../ghcrawler').request
const fs = require('fs')

const stub = 'https://proxy.golang.org/'

describe('Go utility functions', () => {
  it('builds URLs', () => {
    const fetch = GoFetch({})
    expect(fetch._buildUrl(spec('go', 'github.com/myname', 'mymodule', 'v1.2.3'), '.mod')).to.equal(stub + 'github.com/myname/mymodule/@v/v1.2.3.mod')
    expect(fetch._buildUrl(spec('go', 'github.com/myname', 'mymodule', 'v1.2.3'), '.info')).to.equal(stub + 'github.com/myname/mymodule/@v/v1.2.3.info')
    expect(fetch._buildUrl(spec('go', 'github.com/myname', 'mymodule', 'v1.2.3'))).to.equal(stub + 'github.com/myname/mymodule/@v/v1.2.3.zip')
  })
})

function spec(type, namespace, name, revision) {
  return { type, provider: 'googleproxy', namespace, name, revision }
}

