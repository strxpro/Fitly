import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, Alert } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { Button } from 'react-native-elements'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    }).catch(error => {
      console.error('Error getting session:', error.message)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  async function handleSignOut() {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) {
        Alert.alert('Error', error.message)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {session && session.user ? (
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.welcomeText}>Welcome back!</Text>
            <Text style={styles.emailText}>{session.user.email}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>User ID:</Text>
            <Text style={styles.infoValue}>{session.user.id}</Text>
            
            <Text style={styles.infoLabel}>Last Sign In:</Text>
            <Text style={styles.infoValue}>
              {new Date(session.user.last_sign_in_at || '').toLocaleString()}
            </Text>
          </View>

          <Button
            title="Sign Out"
            onPress={handleSignOut}
            loading={loading}
            buttonStyle={styles.signOutButton}
            titleStyle={styles.buttonText}
          />
        </View>
      ) : (
        <Auth />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emailText: {
    fontSize: 16,
    color: '#666',
  },
  infoContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  signOutButton: {
    backgroundColor: '#ff4444',
    borderRadius: 8,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
}) 