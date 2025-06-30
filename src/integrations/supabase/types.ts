export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      api_usage: {
        Row: {
          created_at: string | null
          endpoint: string
          id: string
          ip_address: unknown | null
          merchant_id: string
          method: string
          response_time_ms: number | null
          status_code: number
          user_agent: string | null
        }
        Insert: {
          created_at?: string | null
          endpoint: string
          id?: string
          ip_address?: unknown | null
          merchant_id: string
          method: string
          response_time_ms?: number | null
          status_code: number
          user_agent?: string | null
        }
        Update: {
          created_at?: string | null
          endpoint?: string
          id?: string
          ip_address?: unknown | null
          merchant_id?: string
          method?: string
          response_time_ms?: number | null
          status_code?: number
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "api_usage_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchants"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          billing_address: Json | null
          company_name: string | null
          created_at: string | null
          customer_notes: string | null
          email: string
          id: string
          merchant_id: string
          name: string
          phone: string | null
          shipping_address: Json | null
          total_spent: number | null
          updated_at: string | null
        }
        Insert: {
          billing_address?: Json | null
          company_name?: string | null
          created_at?: string | null
          customer_notes?: string | null
          email: string
          id?: string
          merchant_id: string
          name: string
          phone?: string | null
          shipping_address?: Json | null
          total_spent?: number | null
          updated_at?: string | null
        }
        Update: {
          billing_address?: Json | null
          company_name?: string | null
          created_at?: string | null
          customer_notes?: string | null
          email?: string
          id?: string
          merchant_id?: string
          name?: string
          phone?: string | null
          shipping_address?: Json | null
          total_spent?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchants"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_items: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          invoice_id: string
          line_total: number
          name: string
          product_id: string | null
          quantity: number
          tax_rate: number | null
          unit_price: number
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          invoice_id: string
          line_total: number
          name: string
          product_id?: string | null
          quantity?: number
          tax_rate?: number | null
          unit_price: number
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          invoice_id?: string
          line_total?: number
          name?: string
          product_id?: string | null
          quantity?: number
          tax_rate?: number | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          billing_address: Json
          created_at: string | null
          currency: Database["public"]["Enums"]["currency_code"] | null
          customer_id: string | null
          customer_info: Json
          discount_amount: number | null
          due_date: string
          id: string
          invoice_number: string
          issue_date: string
          merchant_id: string
          notes: string | null
          paid_amount: number | null
          paid_at: string | null
          payment_link: string | null
          sent_at: string | null
          status: Database["public"]["Enums"]["invoice_status"] | null
          subtotal: number
          tax_amount: number
          terms_and_conditions: string | null
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          billing_address: Json
          created_at?: string | null
          currency?: Database["public"]["Enums"]["currency_code"] | null
          customer_id?: string | null
          customer_info: Json
          discount_amount?: number | null
          due_date: string
          id?: string
          invoice_number: string
          issue_date?: string
          merchant_id: string
          notes?: string | null
          paid_amount?: number | null
          paid_at?: string | null
          payment_link?: string | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["invoice_status"] | null
          subtotal?: number
          tax_amount?: number
          terms_and_conditions?: string | null
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          billing_address?: Json
          created_at?: string | null
          currency?: Database["public"]["Enums"]["currency_code"] | null
          customer_id?: string | null
          customer_info?: Json
          discount_amount?: number | null
          due_date?: string
          id?: string
          invoice_number?: string
          issue_date?: string
          merchant_id?: string
          notes?: string | null
          paid_amount?: number | null
          paid_at?: string | null
          payment_link?: string | null
          sent_at?: string | null
          status?: Database["public"]["Enums"]["invoice_status"] | null
          subtotal?: number
          tax_amount?: number
          terms_and_conditions?: string | null
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchants"
            referencedColumns: ["id"]
          },
        ]
      }
      merchants: {
        Row: {
          api_calls_used: number | null
          api_key: string | null
          auto_invoices_used: number | null
          branding_theme: Json | null
          business_address: Json | null
          business_email: string
          business_phone: string | null
          company_name: string
          created_at: string | null
          enabled_crypto_networks:
            | Database["public"]["Enums"]["crypto_network"][]
            | null
          enabled_currencies:
            | Database["public"]["Enums"]["currency_code"][]
            | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          manual_invoices_used: number | null
          payment_settings: Json | null
          subscription_plan:
            | Database["public"]["Enums"]["subscription_plan"]
            | null
          tax_settings: Json | null
          transaction_volume_used: number | null
          updated_at: string | null
          user_id: string
          webhook_url: string | null
          website_url: string | null
        }
        Insert: {
          api_calls_used?: number | null
          api_key?: string | null
          auto_invoices_used?: number | null
          branding_theme?: Json | null
          business_address?: Json | null
          business_email: string
          business_phone?: string | null
          company_name: string
          created_at?: string | null
          enabled_crypto_networks?:
            | Database["public"]["Enums"]["crypto_network"][]
            | null
          enabled_currencies?:
            | Database["public"]["Enums"]["currency_code"][]
            | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          manual_invoices_used?: number | null
          payment_settings?: Json | null
          subscription_plan?:
            | Database["public"]["Enums"]["subscription_plan"]
            | null
          tax_settings?: Json | null
          transaction_volume_used?: number | null
          updated_at?: string | null
          user_id: string
          webhook_url?: string | null
          website_url?: string | null
        }
        Update: {
          api_calls_used?: number | null
          api_key?: string | null
          auto_invoices_used?: number | null
          branding_theme?: Json | null
          business_address?: Json | null
          business_email?: string
          business_phone?: string | null
          company_name?: string
          created_at?: string | null
          enabled_crypto_networks?:
            | Database["public"]["Enums"]["crypto_network"][]
            | null
          enabled_currencies?:
            | Database["public"]["Enums"]["currency_code"][]
            | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          manual_invoices_used?: number | null
          payment_settings?: Json | null
          subscription_plan?:
            | Database["public"]["Enums"]["subscription_plan"]
            | null
          tax_settings?: Json | null
          transaction_volume_used?: number | null
          updated_at?: string | null
          user_id?: string
          webhook_url?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      payment_transactions: {
        Row: {
          amount: number
          created_at: string | null
          currency: Database["public"]["Enums"]["currency_code"]
          customer_info: Json | null
          fees: number | null
          gateway_name: string | null
          gateway_response: Json | null
          gateway_transaction_id: string | null
          id: string
          invoice_id: string | null
          merchant_id: string
          net_amount: number
          payment_method: Database["public"]["Enums"]["payment_method"]
          processed_at: string | null
          status: Database["public"]["Enums"]["transaction_status"] | null
          transaction_id: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency: Database["public"]["Enums"]["currency_code"]
          customer_info?: Json | null
          fees?: number | null
          gateway_name?: string | null
          gateway_response?: Json | null
          gateway_transaction_id?: string | null
          id?: string
          invoice_id?: string | null
          merchant_id: string
          net_amount: number
          payment_method: Database["public"]["Enums"]["payment_method"]
          processed_at?: string | null
          status?: Database["public"]["Enums"]["transaction_status"] | null
          transaction_id: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: Database["public"]["Enums"]["currency_code"]
          customer_info?: Json | null
          fees?: number | null
          gateway_name?: string | null
          gateway_response?: Json | null
          gateway_transaction_id?: string | null
          id?: string
          invoice_id?: string | null
          merchant_id?: string
          net_amount?: number
          payment_method?: Database["public"]["Enums"]["payment_method"]
          processed_at?: string | null
          status?: Database["public"]["Enums"]["transaction_status"] | null
          transaction_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_transactions_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_transactions_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchants"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string | null
          created_at: string | null
          currency: Database["public"]["Enums"]["currency_code"] | null
          description: string | null
          id: string
          is_active: boolean | null
          merchant_id: string
          name: string
          price: number
          sku: string | null
          tax_rate: number | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          currency?: Database["public"]["Enums"]["currency_code"] | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          merchant_id: string
          name: string
          price: number
          sku?: string | null
          tax_rate?: number | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          currency?: Database["public"]["Enums"]["currency_code"] | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          merchant_id?: string
          name?: string
          price?: number
          sku?: string | null
          tax_rate?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchants"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_usage: {
        Row: {
          api_calls_used: number | null
          auto_invoices_used: number | null
          created_at: string | null
          id: string
          manual_invoices_used: number | null
          merchant_id: string
          overage_charges: number | null
          period_end: string
          period_start: string
          transaction_volume_used: number | null
        }
        Insert: {
          api_calls_used?: number | null
          auto_invoices_used?: number | null
          created_at?: string | null
          id?: string
          manual_invoices_used?: number | null
          merchant_id: string
          overage_charges?: number | null
          period_end: string
          period_start: string
          transaction_volume_used?: number | null
        }
        Update: {
          api_calls_used?: number | null
          auto_invoices_used?: number | null
          created_at?: string | null
          id?: string
          manual_invoices_used?: number | null
          merchant_id?: string
          overage_charges?: number | null
          period_end?: string
          period_start?: string
          transaction_volume_used?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "subscription_usage_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchants"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_invoice_number: {
        Args: { merchant_uuid: string }
        Returns: string
      }
    }
    Enums: {
      crypto_network:
        | "ETH"
        | "BTC"
        | "USDT"
        | "SOL"
        | "MATIC"
        | "BNB"
        | "XRP"
        | "AVAX"
        | "ADA"
        | "DOT"
        | "LTC"
        | "BCH"
      currency_code:
        | "INR"
        | "USD"
        | "EUR"
        | "GBP"
        | "JPY"
        | "AUD"
        | "CAD"
        | "SGD"
        | "AED"
        | "CHF"
        | "CNY"
        | "HKD"
        | "KRW"
        | "THB"
        | "MYR"
        | "IDR"
        | "PHP"
        | "VND"
        | "TWD"
        | "NZD"
      invoice_status: "draft" | "sent" | "paid" | "overdue" | "cancelled"
      payment_method:
        | "upi"
        | "neft"
        | "rtgs"
        | "imps"
        | "swift"
        | "card"
        | "crypto"
      subscription_plan:
        | "business_basic"
        | "business"
        | "business_pro"
        | "enterprise"
      transaction_status:
        | "pending"
        | "completed"
        | "failed"
        | "cancelled"
        | "refunded"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      crypto_network: [
        "ETH",
        "BTC",
        "USDT",
        "SOL",
        "MATIC",
        "BNB",
        "XRP",
        "AVAX",
        "ADA",
        "DOT",
        "LTC",
        "BCH",
      ],
      currency_code: [
        "INR",
        "USD",
        "EUR",
        "GBP",
        "JPY",
        "AUD",
        "CAD",
        "SGD",
        "AED",
        "CHF",
        "CNY",
        "HKD",
        "KRW",
        "THB",
        "MYR",
        "IDR",
        "PHP",
        "VND",
        "TWD",
        "NZD",
      ],
      invoice_status: ["draft", "sent", "paid", "overdue", "cancelled"],
      payment_method: [
        "upi",
        "neft",
        "rtgs",
        "imps",
        "swift",
        "card",
        "crypto",
      ],
      subscription_plan: [
        "business_basic",
        "business",
        "business_pro",
        "enterprise",
      ],
      transaction_status: [
        "pending",
        "completed",
        "failed",
        "cancelled",
        "refunded",
      ],
    },
  },
} as const
