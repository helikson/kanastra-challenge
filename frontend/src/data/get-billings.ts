export async function getBillings(pageLink: string): Promise<IGetBillingsResponse | null> {
  const fetcher = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/${import.meta.env.VITE_API_LIST}${pageLink}`,
  );

  if (fetcher.status === 200) {
    const { data, links } = await fetcher.json() as IGetBillingsResponse;
    return { data, links };
  }

  return null;
}