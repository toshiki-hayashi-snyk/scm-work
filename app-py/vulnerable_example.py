# vulnerable_example.py
"""
This file intentionally contains several insecure patterns to demonstrate
Snyk PR comments: SQL injection, command injection, insecure deserialization,
use of eval, hardcoded credentials, and weak hashing.
DO NOT use this code in production.
"""

import sqlite3
import subprocess
import pickle
import hashlib

# Hardcoded credentials (insecure)
DB_USER = "admin"
DB_PASS = "P@ssw0rd123"  # <-- Snyk should flag hardcoded secret


def query_user_by_name(name):
    # SQL injection: string concatenation with user input
    conn = sqlite3.connect(':memory:')
    cur = conn.cursor()
    sql = "SELECT id, name, email FROM users WHERE name = '" + name + "'"
    cur.execute(sql)  # <-- vulnerable to SQL injection
    return cur.fetchall()


def run_command_from_input(cmd):
    # Command injection: using shell=True with untrusted input
    # e.g. cmd could be coming from a request parameter
    subprocess.run(cmd, shell=True)  # <-- command injection risk


def load_user_profile(serialized):
    # Insecure deserialization: using pickle on untrusted data
    profile = pickle.loads(serialized)  # <-- insecure deserialization
