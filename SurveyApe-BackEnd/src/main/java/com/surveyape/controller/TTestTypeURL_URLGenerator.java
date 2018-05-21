package com.surveyape.controller;
import java.util.Random;


public class TTestTypeURL_URLGenerator {


        public static void main (String [] args)
        {
            int                             i;
            TTestTypeURL_URLGenerator       urlGen;
            String                          url;

            urlGen = new TTestTypeURL_URLGenerator ();
            for (i = 0; i < 10; i++)
            {
                //url = urlGen.GetURL ();
                //System.out.println (url);
            }
        }
        public static final String             kAlphaDigit     = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        public static final String []          kSetProtocols =
                {
                        "http"
                };
        public static final String []          kSetTLDs =
                {
                        "com", "gov", "info", "net", "org", "us", "co.uk"
                };
        public static final String []          kSetEMails =
                {

                };


        public Random fGen;


        public TTestTypeURL_URLGenerator ()
        {
            fGen = new Random ();
        }

        public String GetURL (String email,Integer s)
        {
            String      ret;

            ret     = _GetPartProtocol ()+"://18.217.64.116:3000/"+"surveyform/"+"."+ email+"."+s;

            return ret;
        }

    public String GetURL1 (String email,Integer s)
    {
        String      ret;

        ret     = _GetPartProtocol ()+"://18.217.64.116:3000/"+"opensurvey/"+"."+ email+"."+s;

        return ret;
    }

        public String _GetPartHostPort ()
        {
            boolean     hasPort;
            String      ret;

            hasPort = fGen.nextBoolean ();
            ret     = _GetTokenHost ();
            if (hasPort)
            {
                ret += fGen.nextInt (65536);
            }

            return ret;
        }

        public String _GetPartProtocol ()
        {
            String ret;

            ret = _GetUAtomRandomWordFrom (kSetProtocols);

            return ret;
        }

        public String _GetTokenHost ()
        {
            boolean         isIPAddr;
            String          ret;

            isIPAddr = fGen.nextBoolean ();
            if (isIPAddr)
            {
                ret = _GetTokenPartHostIPAddr ();
            }
            else
            {
                ret = _GetTokenPartHostName ();
            }

            return ret;
        }

        public String _GetTokenPartHostIPAddr ()
        {
            String      ret;

            ret = fGen.nextInt (256) + "." +
                    fGen.nextInt (256) + "." +
                    fGen.nextInt (256) + "." +
                    fGen.nextInt (256);

            return ret;
        }

        public String _GetTokenPartHostName ()
        {
            int         nDParts;
            String      dlSet;
            int         i;
            int         dlLen;
            String      ret;

            ret         = "";
            nDParts     = fGen.nextInt (4) + 1;
            for (i = 0; i < nDParts; i++)
            {
                dlLen = fGen.nextInt (6) + 1;
                if (dlLen <= 2)
                {
                    ret += _GetUAtomRandomStringFrom (kAlphaDigit, 1);
                }
                else
                {
                    dlSet = kAlphaDigit + "-";
                    dlLen = dlLen - 2;
                    ret  += _GetUAtomRandomStringFrom (kAlphaDigit, 1);
                    for (i = 0; i < dlLen; i++)
                    {
                        ret += _GetUAtomRandomStringFrom (dlSet, 1);
                    }
                    ret += _GetUAtomRandomStringFrom (kAlphaDigit, 1);
                }
                ret += ".";
            }
            ret += _GetUAtomRandomWordFrom (kSetTLDs);


            return ret;
        }

        public char _GetUAtomRandomCharFrom (String set)
        {
            int  n;
            int  x;
            char ret;

            n   = set.length ();
            x   = fGen.nextInt (n);
            ret = set.charAt (x);

            return ret;
        }

        public String _GetUAtomRandomStringFrom (String set, int sLen)
        {
            int     i;
            String  ret;

            ret     = "";
            for (i = 0; i < sLen; i++)
            {
                ret += _GetUAtomRandomCharFrom (set);
            }

            return ret;
        }

        public String _GetUAtomRandomWordFrom (String [] set)
        {
            int     n;
            int     x;
            String  ret;

            n   = set.length;
            x   = fGen.nextInt (n);
            ret = set [x];

            return ret;
        }
    }

