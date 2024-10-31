'use client'

import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Users } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Define types for our data
type SquadData = {
  name: string;
  performance: number;
  efficiency: number;
  quality: number;
}

type MemberData = SquadData & {
  squad: string;
}

type DataItem = SquadData | MemberData;

// Sample data
const squadData: SquadData[] = [
  { name: 'Alpha', performance: 85, efficiency: 90, quality: 88 },
  { name: 'Beta', performance: 78, efficiency: 82, quality: 80 },
  { name: 'Gamma', performance: 92, efficiency: 88, quality: 95 },
  { name: 'Delta', performance: 70, efficiency: 75, quality: 72 },
]

const memberData: MemberData[] = [
  { name: 'Alice', squad: 'Alpha', performance: 88, efficiency: 92, quality: 90 },
  { name: 'Bob', squad: 'Alpha', performance: 82, efficiency: 88, quality: 86 },
  { name: 'Charlie', squad: 'Beta', performance: 76, efficiency: 80, quality: 78 },
  { name: 'Diana', squad: 'Beta', performance: 80, efficiency: 84, quality: 82 },
  { name: 'Eve', squad: 'Gamma', performance: 94, efficiency: 90, quality: 96 },
  { name: 'Frank', squad: 'Gamma', performance: 90, efficiency: 86, quality: 94 },
  { name: 'Grace', squad: 'Delta', performance: 72, efficiency: 76, quality: 74 },
  { name: 'Henry', squad: 'Delta', performance: 68, efficiency: 74, quality: 70 },
]

export default function SquadDashboard() {
  const [viewType, setViewType] = useState<'squad' | 'member'>('squad')

  const currentData: DataItem[] = viewType === 'squad' ? squadData : memberData

  return (
    <div className="min-h-screen bg-[#FFE1FF] text-[#433878]">
      <header className="bg-[#433878] text-white p-4">
        <h1 className="text-2xl font-bold">Squad Performance Dashboard</h1>
      </header>
      <main className="p-4">
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  id="view-mode"
                  checked={viewType === 'member'}
                  onCheckedChange={(checked) => setViewType(checked ? 'member' : 'squad')}
                />
                <Label htmlFor="view-mode">View by {viewType === 'squad' ? 'Squad' : 'Member'}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-[#7E60BF]" />
                <span className="font-medium">Total: {currentData.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Average scores across all metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={currentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-2 border border-gray-300 rounded shadow">
                              <p className="font-bold">{label}</p>
                              {payload.map((entry, index) => (
                                <p key={index} style={{ color: entry.color }}>
                                  {entry.name}: {entry.value}
                                </p>
                              ))}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Bar dataKey="performance" fill="#433878" />
                    <Bar dataKey="efficiency" fill="#7E60BF" />
                    <Bar dataKey="quality" fill="#E4B1F0" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{viewType === 'squad' ? 'Squad' : 'Member'} List</CardTitle>
              <CardDescription>Click to view detailed information</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="top">Top Performers</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  <div className="grid gap-4 mt-4">
                    {currentData.map((item) => (
                      <div key={item.name} className="flex items-center space-x-4 p-2 rounded-lg bg-[#E4B1F0] bg-opacity-20">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?text=${item.name[0]}`} />
                          <AvatarFallback>{item.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          {'squad' in item && <p className="text-sm text-[#7E60BF]">{item.squad}</p>}
                        </div>
                        <div className="ml-auto text-right">
                          <p className="font-medium">Perf: {item.performance}</p>
                          <p className="text-sm text-[#7E60BF]">Eff: {item.efficiency}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="top">
                  <div className="grid gap-4 mt-4">
                    {currentData
                      .sort((a, b) => b.performance - a.performance)
                      .slice(0, 3)
                      .map((item) => (
                        <div key={item.name} className="flex items-center space-x-4 p-2 rounded-lg bg-[#E4B1F0] bg-opacity-20">
                          <Avatar>
                            <AvatarImage src={`/placeholder.svg?text=${item.name[0]}`} />
                            <AvatarFallback>{item.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            {'squad' in item && <p className="text-sm text-[#7E60BF]">{item.squad}</p>}
                          </div>
                          <div className="ml-auto text-right">
                            <p className="font-medium">Perf: {item.performance}</p>
                            <p className="text-sm text-[#7E60BF]">Eff: {item.efficiency}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}