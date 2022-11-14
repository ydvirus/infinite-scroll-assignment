import { useEffect, useMemo, useState } from "react";
import CasesData from "../../../data/CaseData.json";

export default function useCasesFetch(pageNumber, selectedCustomer) {
  const [loading, setLoading] = useState(true);
  const [cases, setCases] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const caseData = useMemo(() => CasesData, []);
  const casesValid = caseData.filter(
    (customerCase) => customerCase.customerId === selectedCustomer?.customerId
  );
  
  useEffect(() => {
    setCases([]);
  }, [selectedCustomer]);

  useEffect(() => {
    setLoading(true);
    const firstNCases = casesValid.slice(0, pageNumber * 10);
    setCases(firstNCases);

    if (casesValid.length > firstNCases.length) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
    setLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, selectedCustomer]);

  return { loading, cases, hasMore };
}

