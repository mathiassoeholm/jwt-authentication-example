export const publicKey = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAsz/lXRCRReGNWMiTMdKV
reP7cbNTHaxn86FAy98jeJPE5Xd+bwhsBt9hzKLQopWWJ3jY4kvb/jlulTZEN4L3
zCiS+E18DxTD6H0mEuv1MEtiyOfqOaS0pa+2uwLl6qfdmQOq+JGj2ZeUPCXKHiek
25XMB6p5gTpmaY7FaALgEnnHQi/fSNsy773dCKm4I+v7MWZwrRbLD5fQOEOjMGSe
bWR6P9bSLi4x/nR/kULsXjuI/e1zxfxHL4TcMkcT14WBxxhYqRo4aaWDAEwg3tiz
TOvm4ZySfXBBfA+ygWVo4DZVLRj3XgoFgwRe2WQrJgjEQmp+Ry1RWXlbsnq2+ZM4
A3NZLs8KKRD+YDO2XTnIPO097aMNzPO9jPDCgoecV4toW4nCGj7jc3B4B571XDW8
tFWCGXuUyknZ4OVGflXpG6KnNIYgmfqaVIA4YFdiMWiQwCNPfMgU+KSGH1F7S/Pl
SIV25VvOU4TQ33dl0BWPzpKEXXYbOY8k8bKwqeJTvdNTfuaqXRHdirQDYJOYnyec
8eV5CAkZEl9pzeBhd9QbBaFM/ILQijzS+L4G3ALG/HIzaI2Do73X1/q+h1BoIZFn
fFU2Ku9yHnhYvYf25fQZTZPP9E96bUjnpVzXYUmfBM0zsIgRPpZTfNsDbhPJkryJ
QWWb4JGeUb7ZiqKtrBEciQkCAwEAAQ==
-----END PUBLIC KEY-----
`;

export async function handler() {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/plain"
    },
    body: publicKey
  };
}
