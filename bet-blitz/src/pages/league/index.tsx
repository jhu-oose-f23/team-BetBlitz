import Head from "next/head";

import { useEffect, useState } from "react";
import { Event } from "@prisma/client";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";

import { useAuth } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

