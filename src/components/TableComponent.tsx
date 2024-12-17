import { useEffect, useRef, useState } from "react";
import { Paginator } from "primereact/paginator";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import "primereact/resources/primereact.min.css";
import "primereact/resources/primereact.min.css";
import Loader from "./Loader";
export default function TableComponent() {
  const [items, setItems] = useState<Array<any>>([]);
  const [page, setPage] = useState<number>(1);
  const [selectedProducts, setSelectedProducts] = useState<Array<any>>([]);
  const [listTrack, setListTrack] = useState<Array<any>>([]);
  const [isloaded, setLoaded] = useState<Boolean>(true);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const isUpdated = useRef<boolean>(false);
  const op = useRef<OverlayPanel | null>(null);

  const onPageChange = (event: any) => {
    setFirst(event.first);
    setRows(event.rows);
    setPage(event.page + 1);
  };

  useEffect(() => {
    (async () => {
      setLoaded(false);
      try {
        const res: any = await fetch(
          `https://api.artic.edu/api/v1/artworks?page=${page}`
        );
        res.json().then((data: any) => {
          const setData = data.data;
          setItems(setData);
          if (listTrack.length !== 0) sel(setData);
        });
        setTimeout(() => {
          setLoaded(true);
        }, 800);
      } catch (error) {
        console.error(error);
      }
    })();
    return;
  }, [page]);

  
  useEffect(() => {
    if (isUpdated.current) return;
    if (listTrack.length !== 0) sel(items);
    return;
  }, [listTrack]);

  function splitIntoArray(number: number) {
    let result = [];
    const divisor = 12;

    while (number >= divisor) {
      result.push(divisor);
      number -= divisor;
    }

    if (number > 0) {
      result.push(number);
    }
    console.log(result);
    setListTrack(result);
  }


  function sel(data: any) {
    console.log("hello");

    isUpdated.current = true;
    for (let i = 0; i < listTrack[page - 1]; i++) {
      setSelectedProducts((prev: any) => [...prev, data[i]]);
    }
    setListTrack((prev: any[]) => {
      const newList = [...prev];
      newList[page - 1] = 0;
      return newList;
    });
  }

  return !isloaded ? (
    <>
      <Loader />{" "}
    </>
  ) : (
    <>
      <div className=" card border border-zinc-300 rounded-md ">
        <h1 className="text-4xl mb-6  ">
          <b>Page:{`${page}`}</b>
        </h1>
        <DataTable
          value={items}
          showGridlines
          selectionMode={"multiple"}
          selection={selectedProducts!}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey="id"
          tableStyle={{ minWidth: "40rem", minHeight: "100rem" }}
          className="text-left datatable-responsive"
          stripedRows
          emptyMessage={"no data"}
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column>
          <Column
            field=""
            header={
              <>
                <Button
                  type="button"
                  icon="pi pi-image"
                  label=">"
                  onClick={(e) => op.current?.toggle(e)}
                  className="rotate-90 scale-110"
                />
                <OverlayPanel ref={op}>
                  <RowSelect splitIntoArray={splitIntoArray} op={op} />
                </OverlayPanel>
              </>
            }
          ></Column>
          <Column field="id" header="Title"></Column>

          <Column field="place_of_origin" header="Place of origin"></Column>
          <Column field="artist_display" header="Display"></Column>

          <Column field="inscriptions" header="Inscription"></Column>
          <Column field="date_start" header="Start"></Column>
          <Column field="date_end" header="End"></Column>
        </DataTable>
      </div>
      <Paginator
        first={first}
        rows={rows}
        totalRecords={100}
        onPageChange={onPageChange}
      />
    </>
  );
}

const RowSelect = ({ splitIntoArray, op }: any) => {
  const [num, setNum] = useState<number>();
  return (
    <>
      <div className="flex flex-col  border  w-36 h-20 rounded-md  gap-3 ">
        <input
          className="w-full h-10 border border-black rounded-md p-2"
          placeholder="Enter the rows"
          value={num}
          onChange={(e: any) => setNum(e.target.value)}
        />
        <button
          className="bg-zinc-400 rounded-md"
          onClick={(e) => {
            splitIntoArray(num);
            setNum(0);
            op.current?.toggle(e);
          }}
        >
          submit
        </button>
      </div>
    </>
  );
};
