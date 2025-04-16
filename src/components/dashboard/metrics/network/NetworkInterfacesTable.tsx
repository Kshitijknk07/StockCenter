import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { List } from "lucide-react";

interface NetworkInterface {
  name: string;
  ipv4?: string;
  ipv6?: string;
  mac?: string;
  isUp: boolean;
}

interface NetworkInterfacesTableProps {
  interfaces: NetworkInterface[];
}

export function NetworkInterfacesTable({
  interfaces,
}: NetworkInterfacesTableProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <div className="bg-primary/10 p-1.5 rounded-md mr-2">
            <List className="h-4 w-4 text-primary" />
          </div>
          Network Interfaces
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>MAC Address</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {interfaces.map((iface, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{iface.name}</TableCell>
                <TableCell>{iface.ipv4 || "N/A"}</TableCell>
                <TableCell>{iface.mac || "N/A"}</TableCell>
                <TableCell>
                  <span className="flex items-center">
                    <span
                      className={`w-2 h-2 rounded-full mr-2 ${
                        iface.isUp ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></span>
                    {iface.isUp ? "Up" : "Down"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
